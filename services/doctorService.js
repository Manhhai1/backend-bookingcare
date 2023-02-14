import { where } from 'sequelize'
import doctor_infor from '../models/doctor_infor'
import db from '../models/index'
import { v4 as uuidv4 } from 'uuid';
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: 'R2',
                },
                order: [['createdAt', 'DESC']],

                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ]
            })
            resolve({
                errCode: 0,
                data: data,
                message: "get data sucess"
            })
        }
        catch (e) {
            console.log(e)
        }
    })
}
let getAlldoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDoctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: { exclude: ['password'] }
            })
            resolve({
                errCode: 0,
                message: 'get all data doctors success',
                allDoctors: allDoctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postInformationDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.Markdown.findOne({
                where: {
                    doctorId: data.doctorId
                }
            })
            if (!doctor) {
                await db.Markdown.create({
                    contentMarkdown: data.contentMarkdown,
                    contentHTML: data.contentHTML,
                    description: data.description,
                    doctorId: data.doctorId
                })
                resolve({
                    errCode: 0,
                    message: "create data success"
                })
            }
            else {
                doctor.contentMarkdown = data.contentMarkdown
                doctor.contentHTML = data.contentHTML
                doctor.description = data.description
                doctor.doctorId = data.doctorId
                await doctor.save()
                resolve({
                    errCode: 0,
                    message: 'update data success'
                })
            }

        } catch (error) {
            reject(error)
        }
    })

}
let updateInforDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.Doctor_infor.findOne({
                where: { doctorId: data.id }
            })
            if (doctor) {
                doctor.priceId = data.priceId
                doctor.paymentId = data.paymentId
                doctor.raddressClinic = data.addressClinic
                doctor.provinceId = data.provinceId
                doctor.nameClinic = data.nameClinic
                doctor.note = data.note
                doctor.count = data.count
                doctor.specialtyId = data.specialtyId
                await doctor.save()
            }
            let doctorMarkdown = await db.Doctor_infor.findOne({
                where: { doctorId: data.id }
            })
            if (doctorMarkdown) {
                doctorMarkdown.contentMarkdown = data.contentMarkdown
                doctorMarkdown.contentHTML = data.contentHTML
                doctorMarkdown.description = data.description
                doctorMarkdown.doctorId = data.doctorId
                await doctor.save()
            }
            resolve({
                errCode: 0,
                message: 'update data success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getInformationDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Doctor_infor, as: 'doctorData' }
                ],
            })
            resolve({
                errCode: '0',
                message: 'get Information Doctor success',
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDoctorInfor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Doctor_infor.findOne({
                where: { doctorId: id },
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },

                ], raw: false,
                nest: true
            })
            resolve({
                errCode: '0',
                message: 'get Information Doctor success',
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteArr = (array1, array2) => {
    for (var i = 0; i < array2.length; i++) {
        var arrlen = array1.length;
        for (var j = 0; j < arrlen; j++) {
            if (array2[i] == array1[j]) {
                array1 = array1.slice(0, j).concat(array1.slice(j + 1, arrlen));
            }
        }
    }
    return array1
}
let checkValue = async (dataInput) => {
    let dataFromDB = await db.Schedule_teledoctor.findAll({
        where: { doctorId: dataInput[0].doctorId },
        raw: true
    })
    let data = dataInput
    let arr = []
    data.forEach((item, index) => {
        dataFromDB.forEach(element => {

            if (item.date.toString() === element.date &&
                item.month.toString() === element.month &&
                item.year.toString() === element.year &&
                item.keyMap.toString() === element.keyMap) {
                arr.push(item)

            }
        });
    })
    data = deleteArr(data, arr)
    console.log(data)
    return data
}
let postScheduleDoctor = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await checkValue(dataInput)
            db.Schedule.bulkCreate(
                data.map((item, index) => {
                    return item
                })
            )
            resolve({
                errCode: 0,
                message: 'post data success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postScheduleTeleDoctor = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await checkValue(dataInput)
            db.Schedule_teledoctor.bulkCreate(
                data.map((item, index) => {
                    return item
                })
            )
            resolve({
                errCode: 0,
                message: 'post data success'
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getScheduleDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Schedule.findAll({
                where: {
                    doctorId: id
                },
                include: [
                    { model: db.Allcode, attributes: ['type', 'valueEn', 'valueVi'] }
                ],
                nest: true
            })
            resolve({
                errCode: 0,
                message: "get data success",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postDoctorInfor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.Doctor_infor.findOne({
                where: {
                    doctorId: data.doctorId
                }
            })
            if (!doctor) {
                await db.Doctor_infor.create({
                    doctorId: data.doctorId,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    addressClinic: data.addressClinic,
                    nameClinic: data.nameClinic,
                    note: data.note,
                    count: data.count,
                    specialtyId: data.specialtyId
                })
                resolve({
                    errCode: 0,
                    message: 'create data success'
                })
            }
            else {
                doctor.doctorId = data.doctorId
                doctor.priceId = data.priceId
                doctor.paymentId = data.paymentId
                doctor.raddressClinic = data.addressClinic
                doctor.provinceId = data.provinceId
                doctor.nameClinic = data.nameClinic
                doctor.note = data.note
                doctor.count = data.count
                doctor.specialtyId = data.specialtyId
                await doctor.save()
                resolve({
                    errCode: 0,
                    message: 'update data success'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getScheduleDoctorJoinPatient = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Schedule.findAll({
                where: {
                    doctorId: id
                },
                include: [
                    { model: db.Allcode, attributes: ['type', 'valueEn', 'valueVi'] },
                    { model: db.Booking, as: 'scheduleData', attributes: ['namePatient', 'email', 'phoneNumber', 'acceptBooking', 'status', 'id', 'patientId'] }
                ],
                nest: true
            })
            resolve({
                errCode: 0,
                message: "get data success",
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })

}
let deleteBooking = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({ where: { id: id } });
            if (booking) {
                await booking.destroy()
            }
            resolve({
                errCode: 0,
                message: "delete booking by id success",
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postHistory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.History.create({
                patientId: data.patientId,
                doctorId: data.doctorId,
                date: data.date,
                description: data.description
            })
            resolve({
                errCode: 0,
                message: 'post data to history success'
            })
        } catch (error) {
            reject(error)
        }
    })

}
let getAllHistories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let histories = await db.History.findAll()
            resolve({
                errCode: 0,
                message: 'get data to history success',
                histories
            })
        } catch (error) {
            reject(error)
        }
    })

}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAlldoctors: getAlldoctors,
    postInformationDoctor: postInformationDoctor,
    getInformationDoctorById: getInformationDoctorById,
    postScheduleDoctor: postScheduleDoctor,
    getScheduleDoctor: getScheduleDoctor,
    postDoctorInfor: postDoctorInfor,
    getDoctorInfor: getDoctorInfor,
    postScheduleTeleDoctor: postScheduleTeleDoctor,
    getScheduleDoctorJoinPatient: getScheduleDoctorJoinPatient,
    deleteBooking: deleteBooking,
    postHistory: postHistory,
    updateInforDoctor: updateInforDoctor,
    getAllHistories: getAllHistories
}