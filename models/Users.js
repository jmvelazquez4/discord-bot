module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
            primaryKey: true
		},
		contribution: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
        discord_id: {
            type: DataTypes.STRING,
            defaultValue: "Unclaimed"
        }
	}, {
		timestamps: false,
	});
};