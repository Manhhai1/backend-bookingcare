import specialty from '../models/specialty'
import specialtySevice from '../services/specialtySevice'
let getAllSpecialties = async (req, res) => {
    try {
        let specialties = await specialtySevice.getAllSpecialties()
        res.status(200).json(specialties)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}

let getAllDoctorsFromSpecialty = async (req, res) => {
    try {
        let allDoctors = await specialtySevice.getAllDoctorsFromSpecialty(req.query.id)
        res.status(200).json(allDoctors)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let getSpecialtyById = async (req, res) => {
    try {
        let specialty = await specialtySevice.getSpecialtyById(req.query.id)
        res.status(200).json(specialty)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let postInforSpecialty = async (req, res) => {
    try {
        let response = await specialtySevice.postInforSpecialty(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let updateInforSpecialty = async (req, res) => {
    try {
        let response = await specialtySevice.updateInforSpecialty(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let deleteSpecialty = async (req, res) => {
    try {
        let response = await specialtySevice.deleteSpecialty(req.query.id)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
module.exports = {
    getAllSpecialties: getAllSpecialties,
    postInforSpecialty: postInforSpecialty,
    getSpecialtyById: getSpecialtyById,
    updateInforSpecialty: updateInforSpecialty,
    deleteSpecialty: deleteSpecialty,
    getAllDoctorsFromSpecialty: getAllDoctorsFromSpecialty
}