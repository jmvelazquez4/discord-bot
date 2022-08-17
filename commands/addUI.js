const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution, UI, SetupFile } = require('../dbObjects')
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addui')
		.setDescription('Set up the UI for different users'),
	async execute(interaction) {
	},
};