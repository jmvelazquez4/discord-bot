const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const IndividualContribution = require('./models/IndividualContribution.js')(sequelize, Sequelize.DataTypes);
const SetupFile = require('./models/SetupFile.js')(sequelize, Sequelize.DataTypes);
const UI = require('./models/UI.js')(sequelize, Sequelize.DataTypes);

module.exports = { Users, IndividualContribution, UI, SetupFile };