import telemedicineSevice from '../services/telemedicineSevice'
let getAllTelemedicines = async (req, res) => {
    try {
        let telemedicines = await telemedicineSevice.getAllTelemedicines()
        res.status(200).json(telemedicines)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever ',
            errCode: -1
        })
    }
}
let deleteTelemedicine = async (req, res) => {
    try {
        let response = await telemedicineSevice.deleteTelemedicine(req.query.id)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let postInforTelemedicine = async (req, res) => {
    try {
        let response = await telemedicineSevice.postInforTelemedicine(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let getTelemedicineById = async (req, res) => {
    try {
        let telemedicine = await telemedicineSevice.getTelemedicineById(req.query.id)
        res.status(200).json(telemedicine)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
let updateInforTelemedicine = async (req, res) => {
    try {
        let response = await telemedicineSevice.updateInforTelemedicine(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever ',
            errCode: -1
        })
    }
}
let getAllDoctorsFromTelemedicine = async (req, res) => {
    try {
        let allDoctors = await telemedicineSevice.getAllDoctorsFromTelemedicine(req.query.id)
        res.status(200).json(allDoctors)
    } catch (error) {
        res.status(200).json({
            message: 'error from sever',
            errCode: -1
        })
    }
}
module.exports = {
    getAllTelemedicines: getAllTelemedicines,
    deleteTelemedicine: deleteTelemedicine,
    postInforTelemedicine: postInforTelemedicine,
    getTelemedicineById: getTelemedicineById,
    updateInforTelemedicine: updateInforTelemedicine,
    getAllDoctorsFromTelemedicine: getAllDoctorsFromTelemedicine
}