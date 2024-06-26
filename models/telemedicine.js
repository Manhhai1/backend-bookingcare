'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Telemedicine extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Telemedicine.init({
        description: DataTypes.TEXT('long'),
        image: DataTypes.BLOB('long'),
        name: DataTypes.STRING,
        descriptionMarkdown: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Telemedicine',
    });
    return Telemedicine;
};