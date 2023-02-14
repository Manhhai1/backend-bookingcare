import express from "express"
import homeController from "../controllers/homeController"
import bp from 'body-parser'
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController'
import patientController from '../controllers/patientController'
import specialtyController from '../controllers/specialtyController'
import telemedicineController from '../controllers/telemedicineController'
import { use } from "express/lib/router";
import { route } from "express/lib/application"
let router = express.Router()
let initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)
    app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/getCrud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/putUser', homeController.putUser);
    router.get('/delete-crud', homeController.deleteUser);
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.getAllUsers)
    router.post('/api/create-new-user', userController.createNewUserFromController)
    router.delete('/api/delete-user', userController.deleteUserFromController)
    router.put('/api/edit-user', userController.editUser)

    //doctor
    router.get('/api/getAllcodes', userController.getAllCodes)
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAlldoctors)
    router.post('/api/post-information-doctor', doctorController.postInformationDoctor)
    router.get('/api/information-doctor', doctorController.getInformationDoctorById)
    router.post('/api/post-schedule-doctor', doctorController.postScheduleDoctor)
    router.post('/api/post-schedule-teledoctor', doctorController.postScheduleTeleDoctor)
    router.get('/api/get-schedule-doctor', doctorController.getScheduleDoctor)
    router.post('/api/post-infor-doctor', doctorController.postDoctorInfor)
    router.get('/api/doctor-infor', doctorController.getDoctorInfor)
    router.post('/api/booking-from-patient', patientController.postBookingFromPatient)
    router.post(`/api/accept-booking-from-patient`, patientController.postAcceptBookingFromPatient)
    router.get(`/api/schedule-doctor-booking`, doctorController.getScheduleDoctorJoinPatient)
    router.delete('/api/delete-booking', doctorController.deleteBooking)
    router.put('/api/update-infor-doctor', doctorController.updateDoctorInfor)
    router.post('/api/post-history', doctorController.postHistory)
    router.get('/api/all-histories', doctorController.getAllHistories)



    ///Specialty
    router.get(`/specialty`, specialtyController.getAllSpecialties)
    router.get('/specialty-by-id', specialtyController.getSpecialtyById)
    router.get('/specialty-all-doctors', specialtyController.getAllDoctorsFromSpecialty)
    router.post(`/post-infor-specialty`, specialtyController.postInforSpecialty)
    router.put('/update-infor-specialty', specialtyController.updateInforSpecialty)

    router.delete('/delete-specialty', specialtyController.deleteSpecialty)


    //telemidicine
    router.get(`/telemedicines`, telemedicineController.getAllTelemedicines)
    router.delete('/delete-telemedicine', telemedicineController.deleteTelemedicine)
    router.post('/post-infor-telemedicine', telemedicineController.postInforTelemedicine)
    router.get('/telemedicine-by-id', telemedicineController.getTelemedicineById)
    router.put('/update-infor-telemedicine', telemedicineController.updateInforTelemedicine)
    router.get('/telemedicine-all-doctors', telemedicineController.getAllDoctorsFromTelemedicine)
    return app.use('/', router)
}

module.exports = initWebRouter