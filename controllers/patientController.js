import patientSevice from '../services/patientSevice'
let postBookingFromPatient = async (req, res) => {
    try {
        let response = await patientSevice.postBookingFromPatient(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'post data error from server',
            data
        })
    }
}
let postAcceptBookingFromPatient = async (req, res) => {
    try {
        let token = req.query.token
        let response = await patientSevice.postAcceptBookingFromPatient(token)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'post data error from server',
            data
        })
    }
}
module.exports = {
    postBookingFromPatient: postBookingFromPatient,
    postAcceptBookingFromPatient: postAcceptBookingFromPatient
}