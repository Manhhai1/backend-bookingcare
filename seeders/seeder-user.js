module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@example.com',
            address: 'Viet Nam',
            password: '12345',
            gender: 'F',
            roleId: 'R2',
            positionId: 'P1',
            phoneNumber: '1234',
            image: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};