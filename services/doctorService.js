import db from '../models/index'
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                limit: limitInput,
                where: {
                    roleId: 'R2'
                },
                order: [['createdAt', 'DESC']],

                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ]
            })
            resolve({
                errCode: 0,
                data: data,
                message: "get data sucess"
            })
        }
        catch (e) {
            console.log(e)
        }
    })
}
let getAlldoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allDoctors = await db.User.findAll({
                where: {
                    roleId: 'R2'
                },
                attributes: { exclude: ['password', 'image'] }
            })
            resolve({
                errCode: 0,
                message: 'get all data doctors success',
                allDoctors: allDoctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
let postInformationDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Markdown.create({
                contentMarkdown: data.contentMarkdown,
                contentHTML: data.contentHTML,
                description: data.description,
                doctorId: data.doctorId
            })
            resolve({
                errCode: 0,
                message: 'save the information success'
            })

        } catch (error) {
            reject(error)
        }
    })

}
let getInformationDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes:{
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
                ], 
                raw: true,
                nest:true
            })
            resolve({
                errCode:'0',
                message: 'get Information Doctor success',
                data: data
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAlldoctors: getAlldoctors,
    postInformationDoctor: postInformationDoctor,
    getInformationDoctorById: getInformationDoctorById
}