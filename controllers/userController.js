import CRUDService from '../services/CRUDSevice'
import db from '../models/index'
import { send } from 'express/lib/response'
import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let user = req.body
    let check = await CRUDService.isCheckUser(user.email, user.password)
    if (check) {
        let dataUser = await db.User.findOne({
            where: { email: user.email },
        })
        return res.status(200).json({
            errCode: 0,
            message: 'loggin sucess',
            dataUser: dataUser
        })
    }
    else {
        return res.status(500).json({
            errCode: 1,
            message: 'username or password is not exist'
        })
    }

}
let getAllUsers = async (req, res) => {
    let id = req.query.id
    let allusers = await CRUDService.getAllUsersfromSevice(id)
    return res.status(200).json({
        errCode: 0,
        allusers
    })
}
let createNewUserFromController = async (req, res) => {

    let message = await CRUDService.createNewUser(req.body)
    return res.status(200).json(message)
}
let deleteUserFromController = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            message: 'Missing required parameters'
        })
    }
    let message = await CRUDService.deleteUserFromUserService(req.body.id)
    return res.status(200).json(message)
}
let editUser = async (req, res) => {
    let updateUser = req.body
    let message = await CRUDService.editUserFromUserService(updateUser)
    return res.status(200).json(message)
}
let getAllCodes = async (req, res) => {
    let query = req.query.type
    let message = await userService.getAllCodeFromUserService(query)
    return res.status(200).json(message)
}
module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    createNewUserFromController: createNewUserFromController,
    deleteUserFromController: deleteUserFromController,
    editUser: editUser,
    getAllCodes: getAllCodes
}
