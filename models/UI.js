module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ui', {
		discord_id: {
			type: DataTypes.STRING,
            allowNull: false,
		},
		ui: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};