const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('contribution')
		.setDescription('Replies with your contribution!'),
	async execute(interaction) {
        const tag = await Users.findOne({ where: { discord_id: interaction.user.id } });
        if(tag){
            const user = await IndividualContribution.findOne({ where: { user_id: tag.get('user_id') } });
            return interaction.reply(`Your contribution for the previous week was ${tag.get('contribution')}! Your total contribution is ${user.get('total')}`);
            }
        return interaction.reply('You have not claimed a profile yet! Use /claim to find your wild rift profile');
        }
};