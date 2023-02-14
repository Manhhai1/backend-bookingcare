import { where } from 'sequelize'
import db from '../models/index'
import emailSevice from './emailSevice'
import { v4 as uuidv4 } from 'uuid';
import schedule from '../models/schedule';
let postBookingFromPatient = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let patient = await db.Booking.findOne({
                where: {
                    patientId: data.patientId
                }
            })
            if (patient) {
                patient.status = data.status
                patient.paymentId = data.paymentId
                patient.genderId = data.genderId
                patient.namePatient = data.namePatient
                patient.phoneNumber = data.phoneNumber
                patient.doctorId = data.doctorId
                patient.patientId = data.patientId
                patient.scheduleId = data.scheduleId
                patient.provinceId = data.provinceId
                patient.dayofbirth = data.dayofbirth
                patient.address = data.address
                await patient.save()
            }
            else {
                let token = uuidv4()
                await db.Booking.create({
                    status: data.status,
                    paymentId: data.paymentId,
                    genderId: data.genderId,
                    namePatient: data.namePatient,
                    phoneNumber: data.phoneNumber,
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    scheduleId: data.scheduleId,
                    provinceId: data.provinceId,
                    dayofbirth: data.dayofbirth,
                    address: data.address,
                    token: token,
                    acceptBooking: false

                })
                let schedule = await db.Schedule.findOne({
                    where: {
                        id: data.scheduleId
                    },
                    include: [
                        { model: db.Allcode, attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'nameDoctor', attributes: ['firstName', 'lastName'] }
                    ],
                }
                )
                // console.log(schedule)
                await emailSevice.sentEmail({
                    receiverEmail: 'vomanhhai230720@gmail.com',
                    date: schedule.date,
                    month: +schedule.month+1,
                    year: schedule.year,
                    time: schedule.Allcode.valueVi,
                    lastNameDoctor: schedule.nameDoctor.lastName,
                    firstNameDoctor: schedule.nameDoctor.firstName,
                    token: token
                })
            }
            resolve({
                errCode: 0,
                message: "post data success"
            })
        } catch (error) {
            reject(error)
        }
    })
}

let postAcceptBookingFromPatient = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Booking.findOne({
                where: {
                    token: token
                }
            })
            if (data) {
                data.acceptBooking = true
                await data.save()
                resolve({
                    errCode: 0,
                    message: "post data success"
                })
            }
            else {
                resolve({
                    errCode: 0,
                    message: "not found data"
                })
            }

        } catch (error) {
            reject(error)
        }
    })

}
module.exports = {
    postBookingFromPatient: postBookingFromPatient,
    postAcceptBookingFromPatient: postAcceptBookingFromPatient
}