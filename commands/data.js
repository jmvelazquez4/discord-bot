const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('data')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const tagList = await Users.findAll({ attributes: ['user_id'] });
        const tagString = tagList.map(t => t.user_id).join(', ') || 'No tags set.';
    
        return interaction.reply(`List of tags: ${tagString}`);
	},
};