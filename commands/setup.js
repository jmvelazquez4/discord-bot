const { SlashCommandBuilder, messageLink } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution, SetupFile } = require('../dbObjects')
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Choose permissions and what channel BotBot will use'),
	async execute(interaction) {
        const tag = await SetupFile.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        });         
        if (tag.read_info != true){
            interaction.reply("You have not read BotBot information yet! Use /info to begin ")
        }
        interaction.reply({content: `Please type the channel that you would like to send images to BotBot`, fetchReply : true})
        const filter = m => m.mentions.channels.first();
        const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });
        
        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
            tag.update({channel_id: m.content})
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            interaction.followUp({content: `Please tag the role that you would like to be able to send images to BotBot`, fetchReply : true});
            const filter = m => m.mentions.roles.first();
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });
            
            collector.on('collect', m => {
                tag.update({mod_perm: m.content})
                console.log(`Collected ${m.content}`);
            });
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
                interaction.followUp({content: `Please tag the role that you would like to be able to use BotBot's guild member commands`, fetchReply : true});
                const filter = m => m.mentions.roles.first();
                const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 });
                
                collector.on('collect', m => {
                    tag.update({role_perm: m.content})
                    console.log(`Collected ${m.content}`);
                });
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0xFD00AD)
                    .setTitle('Congrats on Setting Up BotBot')
                    .setDescription('You did it! Check the values below to make sure everything is the way you want. Else, try /setup again.')
                    .addFields( [
                        { name: 'Channel', value: `${tag.get('channel_id')}`, inline: true},
                        { name: 'Mod Permissions', value: `${tag.get('mod_perm')}`, inline:true},
                        { name: 'Guild Member Permissions', value: `${tag.get('role_perm')}`,inline:true},
                    ]
                    )
                    .setTimestamp()
                    .setFooter({ text: 'BotBot was created by Airose (airoz#8575)' });                    
                    interaction.followUp({embeds: [exampleEmbed]})
                });                
            });

        });              
	},
};