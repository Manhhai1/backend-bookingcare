const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('railway', 'root', '8AZLB5719xc8o59523kw', {
    host: 'containers-us-west-42.railway.app',
    port: '6635',
    dialect: 'mysql',

});
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;