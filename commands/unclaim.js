const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unclaim')
		.setDescription('Unclaim your profile')
        .addStringOption(option => option.setName('user')
                .setDescription('Enter the user you would like to unclaim')
                .setRequired(true)
                .setAutocomplete(true)
                ),
    async autocomplete(interaction, client){
        const tagList = await Users.findAll({ attributes: ['user_id'], where: { discord_id: interaction.user.id }, raw: true });
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

        const affectedRows = await Users.update({ discord_id: "Unclaimed" }, { where: { user_id: option } });

        if (affectedRows > 0) {
            return interaction.reply(`User ${option} was unclaimed.`);
        }
    
        await interaction.reply(`Could not find a user with name ${option}.`);
	},
};

