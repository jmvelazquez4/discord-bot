module.exports = (sequelize, DataTypes) => {
	return sequelize.define('individual_contribution', {
		user_id: DataTypes.STRING,
		week1: {
			type: DataTypes.INTEGER,
            allowNull: true,
			'default': 0,
		},
        week2: {
			type: DataTypes.INTEGER,
            allowNull: true,
			'default': 0,
		},
        week3: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week4: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week5: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week6: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week7: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week8: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week9: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week10: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week11: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
        week12: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
		total: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		}
        
	}, {
		timestamps: true,
	});
};