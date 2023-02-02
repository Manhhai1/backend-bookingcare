import express from "express"
import homeController from "../controllers/homeController"
import bp from 'body-parser'
import userController from '../controllers/userController'
import doctorController from '../controllers/doctorController'
import { use } from "express/lib/router";
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

    router.get('/api/getAllcodes', userController.getAllCodes)
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.getAlldoctors)
    router.post('/api/post-information-doctor', doctorController.postInformationDoctor)
    router.get('/api/information-doctor', doctorController.getInformationDoctorById)
    return app.use('/', router)
}

module.exports = initWebRouter