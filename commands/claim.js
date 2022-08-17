const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution } = require('../dbObjects')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('claim')
		.setDescription('Claim your profile')
        .addStringOption(option => option.setName('user')
                .setDescription('Enter the user you would like to claim')
                .setRequired(true)
                .setAutocomplete(true)
                ),
    async autocomplete(interaction, client){
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

        const tag = await Users.findOne({ where: { discord_id: interaction.user.id } });
        if(tag){
            if(interaction.user.id == tag.get('discord_id')){
                return interaction.reply(`You have already claimed this user!`);
            }
            return interaction.reply(`This user has already been claimed by <@${tag.get('discord_id')}>`);
        }

        const affectedRows = await Users.update({ discord_id: interaction.user.id }, { where: { user_id: option } });

        if (affectedRows > 0) {
            return interaction.reply(`User ${option} was claimed.`);
        }
    
        await interaction.reply(`Could not find a user with name ${option}.`);
	},
};

