module.exports = (sequelize, DataTypes) => {
	return sequelize.define('setup_file', {
		channel_id: {
			type: DataTypes.STRING,
            allowNull: true,
		},
		role_perm: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: true,
		},
        mod_perm: {
			type: DataTypes.STRING,
			defaultValue: 0,
			allowNull: true,
		},
        read_info:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
	}, {
		timestamps: true,
	});
};