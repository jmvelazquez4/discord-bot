const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution, UI, SetupFile } = require('../dbObjects')
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Possible Commands for BotBot'),
	async execute(interaction) {      
        const exampleEmbed = new EmbedBuilder()
        .setColor(0xFD00AD)
        .setTitle('BotBot Commands')
        .addFields( [
            { name: 'Admin', value: '/Info - Begins the set-up process for BotBot\n /Setup - Allows for channel and member permission configuration \n /Add - Adds a user to the dataset\n /Remove - Removes a user from the dataset\n /AddUI - Allows you to set up your individual UI setup '},
            { name: 'Member', value: '/Claim - Claims your character so that you can access your stats \n /Unclaim - Unclaims your character \n /Contribution - Shows your individual and total contribution, /Data - Shows all users that have data with the guild'},
        ]
        ) 
        .setTimestamp()
        .setFooter({ text: 'BotBot was created by Airose (airoz#8575)' });
        const sentMessage = await interaction.reply({ embeds: [exampleEmbed] });

	},
};