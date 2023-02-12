import { status } from 'express/lib/response';
import doctorService from '../services/doctorService'
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 50;
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    }
    catch (e) {
        reject(e)
        return res.status(200).json({
            errCode: -1,
            message: "Error Code from server.."
        })
    }
}
let getAlldoctors = async (req, res) => {
    try {
        let allDoctors = await doctorService.getAlldoctors()
        return res.status(200).json(allDoctors)
    }
    catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'get data failed'
        })
    }
}
let postInformationDoctor = async (req, res) => {
    try {
        let response = await doctorService.postInformationDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "error code from server"
        })
    }
}
let getInformationDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getInformationDoctorById(req.query.id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'get data error from server'
        })
    }
}
let postScheduleDoctor = async (req, res) => {
    try {
        let response = await doctorService.postScheduleDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'get data error from server'
        })
    }
}
let getScheduleDoctor = async (req, res) => {
    try {
        let response = await doctorService.getScheduleDoctor(req.query.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'get data error from server'
        })
    }
}
let postDoctorInfor = async (req, res) => {
    try {
        let response = await doctorService.postDoctorInfor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'get data error from server'
        })
    }
}
let getDoctorInfor = async (req, res) => {
    try {
        let response = await doctorService.getDoctorInfor(req.query.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'get data error from server'
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAlldoctors: getAlldoctors,
    postInformationDoctor: postInformationDoctor,
    getInformationDoctorById: getInformationDoctorById,
    postScheduleDoctor: postScheduleDoctor,
    getScheduleDoctor: getScheduleDoctor,
    postDoctorInfor: postDoctorInfor,
    getDoctorInfor: getDoctorInfor
}