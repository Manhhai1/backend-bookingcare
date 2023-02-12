import db from '../models/index'
let getAllTelemedicines = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let telemedicines = await db.Telemedicine.findAll()
            resolve({
                errCode: 0,
                message: "get all data from Telemedicines success",
                telemedicines: telemedicines
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteTelemedicine = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = await db.Telemedicine.findOne({
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
let postInforTelemedicine = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Telemedicine.create({
                name: data.name,
                descriptionMarkdown: data.descriptionMarkdown,
                image: data.imageBase64,
                description: data.description

            })
            resolve({
                errCode: 0,
                message: "post Telemedicine success"
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getTelemedicineById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let telemedicine = await db.Telemedicine.findOne({
                where: {
                    id: id
                }
            })
            resolve({
                errCode: 0,
                message: "get specialty by id success",
                telemedicine
            })
        } catch (error) {
            reject(error)
        }
    })
}
let updateInforTelemedicine = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let telemedicine = await db.Telemedicine.findOne({
                where: {
                    id: data.id
                }
            })
            console.log(telemedicine)
            if (telemedicine) {
                telemedicine.name = data.name
                telemedicine.image = data.imageBase64
                telemedicine.description = data.description
                telemedicine.descriptionMarkdown = data.descriptionMarkdown
                await telemedicine.save()
            }

            resolve({
                errCode: 0,
                message: "Update Telemedicine success"
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllTelemedicines: getAllTelemedicines,
    deleteTelemedicine: deleteTelemedicine,
    postInforTelemedicine: postInforTelemedicine,
    getTelemedicineById: getTelemedicineById,
    updateInforTelemedicine: updateInforTelemedicine

}