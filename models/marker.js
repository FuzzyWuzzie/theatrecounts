module.exports = function(sequelize, Sequelize) {
	return sequelize.define('Marker', {
			name: { type: Sequelize.STRING,  allowNull: true, unique: false },
			description: { type: Sequelize.STRING,  allowNull: false, unique: false },
			latitude: { type: Sequelize.FLOAT,  allowNull: false, unique: false },
			longitude: { type: Sequelize.FLOAT,  allowNull: false, unique: false },
			address: { type: Sequelize.STRING,  allowNull: true, unique: false },
			phone: { type: Sequelize.STRING,  allowNull: true, unique: false },
			email: { type: Sequelize.STRING,  allowNull: true, unique: false }
		});
}