import db from '../models/index'
import specialty from '../models/specialty'
import doctorSevice from '../services/doctorService'
let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll()
            resolve({
                errCode: 0,
                message: "get all data from specialties success",
                specialties
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getSpecialtyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: {
                    id: id
                }
            })
            resolve({
                errCode: 0,
                message: "get specialty by id success",
                specialty
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postInforSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialty.create({
                name: data.name,
                descriptionMarkdown: data.descriptionMarkdown,
                image: data.imageBase64,
                description: data.description

            })
            resolve({
                errCode: 0,
                message: "post Specialty success"
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updateInforSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: {
                    id: data.id
                }
            })
            if (specialty) {
                specialty.name = data.name
                specialty.image = data.imageBase64
                specialty.description = data.description
                specialty.descriptionMarkdown = data.descriptionMarkdown
                await specialty.save()
            }

            resolve({
                errCode: 0,
                message: "Update Specialty success"
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: {
                    id: id
                }
            })
            if (specialty) {
                await specialty.destroy()
            }
            resolve({
                errCode: 0,
                message: "delete Specialty success"
            })
        } catch (error) {
            reject(error)
        }
    })
}
let arr = async (arr) => {
    let data = []
    let dat = []
    arr.map(async (item, index) => {
        let doctorInfor = await doctorSevice.getInformationDoctorById(item.id)
        await data.push(doctorInfor.data)
    })
    await console.log(dat)
    return data
}
let getAllDoctorsFromSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDoctorsFromSpecialty = await db.Doctor_infor.findAll({
                where: {
                    specialtyId: id
                },
                include: [
                    {
                        model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName', 'id', 'image'],
                        include: [
                            { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },

                        ]
                    },
                    {
                        model: db.Markdown, as: 'markdownData', attributes: ['description', 'contentHTML', 'contentMarkdown']
                    },
                    {
                        model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi']
                    },
                    {
                        model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi']
                    }
                ]
            })
            let allScheduleOfDoctor = await db.Doctor_infor.findAll({
                where: {
                    specialtyId: id
                },
                attributes: ['doctorId'],
                include: [
                    {
                        model: db.Schedule, as: 'scheduleDoctor',
                        include: [
                            { model: db.Allcode, attributes: ['type', 'valueEn', 'valueVi'] }
                        ]
                    }

                ]
            })
            resolve({
                errCode: 0,
                message: "get all Doctors from Specialty success",
                allDoctorsFromSpecialty,
                allScheduleOfDoctor
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllSpecialties: getAllSpecialties,
    postInforSpecialty: postInforSpecialty,
    getSpecialtyById: getSpecialtyById,
    updateInforSpecialty: updateInforSpecialty,
    deleteSpecialty: deleteSpecialty,
    getAllDoctorsFromSpecialty: getAllDoctorsFromSpecialty
}