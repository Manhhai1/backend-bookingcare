import { json } from 'express/lib/response'
import { stringify } from 'nodemon/lib/utils'
import bp from 'body-parser'
import db from '../models/index'
import CRUDSevice from '../services/CRUDSevice'

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }
}
let getCRUD = (req, res) => {
    try {
        return res.render('crud.ejs')
    } catch (error) {
        console.log(error)
    }
}
let postCRUD = async (req, res) => {
    await CRUDSevice.createNewUser(req.body)
    return res.send('go to postCrud')
}
let displayGetCRUD = async (req, res) => {
    let allUsers = await db.User.findAll()
    return res.render('displaygetCRUD.ejs', {
        dataTable: allUsers
    })
}
let getEditCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        let user = await CRUDSevice.getUser(id)
        return res.render('editUser.ejs',{
            user: user
        })
    }
    else {
        res.send("User not found!")
    }
}
let putUser = async(req, res)=>{
    let user = req.body;
    let allUsers = await CRUDSevice.updateUser(user);
    return res.render('displaygetCRUD.ejs', {
        dataTable: allUsers
    })
}
let deleteUser =async(req, res)=>{
    let id = req.query.id
    if(id){
        let allUsers  = await CRUDSevice.delUser(id)
        return res.render('displaygetCRUD.ejs', {
            dataTable: allUsers
        })
    }
    else {
        res.send("User not found")
    }
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putUser: putUser,
    deleteUser: deleteUser
}