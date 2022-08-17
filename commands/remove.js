const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Removes a user')
        .addStringOption(option => option.setName('user')
                .setDescription('Enter the user you would like to remove')
                .setRequired(true)
                .setAutocomplete(true)
                ),
    async autocomplete(interaction, clint){
        const tagList = await Users.findAll({ attributes: ['user_id'], raw: true });
        const tagArray = tagList.map(t => t.user_id);

        const focusedValue = interaction.options.getFocused();
        const choices = tagArray;
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
	async execute(interaction) {
        const option = interaction.options.getString('user');
        const rowCount = await Users.destroy({ where: { user_id: option } });

        if (!rowCount) return interaction.reply('That user doesn\'t exist.');
    
        await interaction.reply({content: `You removed the user, "${option}"`});
	},
};

