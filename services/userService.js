import db from '../models/index'
let getAllCodeFromUserService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUsers = {}
            if (!typeInput) {
                resolve({
                    message: 'type is not correct'
                })
            }
            else{
                allUsers.data = await db.Allcode.findAll({
                    where:{
                        type: typeInput
                    }
                })
            }
            resolve(allUsers.data)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports ={
    getAllCodeFromUserService: getAllCodeFromUserService
}