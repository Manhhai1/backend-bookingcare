import bcrypt from 'bcryptjs'
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await isCheckUserExist(data.email)
            if (check) {
                resolve({
                    message: 'email is already exist',
                    errCode: 1
                })
            }
            else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPassword,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phoneNumber: data.phoneNumber,
                    positionId: data.position,
                    image:data.image
                })
                let user = db.User.findOne({
                    where: { email: data.email }
                })
                resolve({
                    message: 'create new user success',
                    errCode: 0,
                    user
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsersfromSevice = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUsers = {}
            if (id === 'all') {
                allUsers = await db.User.findAll()
                resolve(allUsers)
            }
            if (id !== 'all' && id) {
                allUsers = await db.User.findOne({
                    where: { id: id }
                })
            }
            resolve(allUsers)
        } catch (error) {
            reject(error)
        }
    })
}
let getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId } });
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: data.id } });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }
            else {
                resolve()
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}
let delUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            if (user) {
                await user.destroy()
            }
            let allUsers = await db.User.findAll()
            resolve(allUsers)
        } catch (error) {
            reject(error)
        }
    })
}
let isCheckUser = async (email, password) => {
    let user = await db.User.findOne({
        where: { email: email }
    })
    if (user) {
        let check = bcrypt.compareSync(password, user.password);
        if (check) return true
        else return false
    }
    else return false;
}
let isCheckUserExist = async (email) => {
    let user = await db.User.findOne({
        where: { email: email }
    })
    if (user) return true
    else return false
}
let deleteUserFromUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            if (user) {
                db.User.destroy({
                    where: { id: id }
                })
                resolve({
                    message: 'delete user success',
                    errCode: 0
                })
            }
            else {
                resolve({
                    message: 'user is not exist',
                    errCode: 1
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let editUserFromUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'Update User success'
                })
            }
            else resolve({
                errCode: 1,
                message: 'user is not found'
            })
        } catch (error) {
            reject(error)
        }

    })
}
module.exports = {
    createNewUser: createNewUser,
    getUser: getUser,
    updateUser: updateUser,
    delUser: delUser,
    isCheckUser: isCheckUser,
    getAllUsersfromSevice: getAllUsersfromSevice,
    isCheckUserExist: isCheckUserExist,
    deleteUserFromUserService: deleteUserFromUserService,
    editUserFromUserService: editUserFromUserService
}