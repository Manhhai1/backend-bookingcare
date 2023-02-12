import db from '../models/index'
let getAllCodeFromUserService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let typeCode = {}
            if (!typeInput) {
                resolve({
                    message: 'type is not correct'
                })
            }
            else {
                if (typeInput === 'all') {
                    typeCode = await db.Allcode.findAll()
                }
                else {
                    typeCode = await db.Allcode.findAll({
                        where: {
                            type: typeInput
                        }
                    })
                }
            }
            resolve({
                errCode:'get data success',
                typeCode: typeCode
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllCodeFromUserService: getAllCodeFromUserService
}