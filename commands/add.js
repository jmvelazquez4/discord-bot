const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Users.create({
				user_id: interaction.user.username,
                contribution: "5"
			});

			return interaction.reply(`Tag ${tag.user_id} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}

			return interaction.reply('Something went wrong with adding a tag.');
		}
	},
};