const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');
const { Users, IndividualContribution, UI, SetupFile } = require('../dbObjects')
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Learn about setting up BotBot'),
	async execute(interaction) {     
        const tag = await SetupFile.findOne({
            order: [ [ 'createdAt', 'DESC' ]],
        });       
        const exampleEmbed = new EmbedBuilder()
        .setColor(0xFD00AD)
        .setTitle('Welcome to BotBot')
        .setDescription('Hi. My name is BotBot and I am here to guide you through the set-up process!')
        .addFields( [
            { name: 'How it Works', value: 'BotBot uses Tesseract OCR to scan images from WildRift. It "reads" what is in the image and converts it into something usable. BotBot will track members contribution, progress, and more. Before it is able to do this, it needs to know some information about the server and who should be can use the bot.'},
            { name: 'How to Take Images', value: 'When screenshotting images, please do not crop or edit the image afterwards. Please make sure all names are fully visible and not cut off. An example screenshot can be seen below.'},
            { name: 'Setting up UIs for Admins', value: 'It is incredibly important to set up the UIs for each Admin that you want to be able to send images to BotBot. Since the bot automatically edits the image for you, different UIs lead to different results. When setting up the UI, you will provide the dimensions of your screen. Afterwards, you can use the command /test to see if BotBot is returning the correct values for your dimensions.. Please make the bot is reading the information correctly. If it is not, check your dimensions. If the dimensions are correrct, please contact Airose'},
            { name: 'Next Steps', value: 'Please click the checkmark down before to mark that you have read the information. Then, use /setup to begin. Afterwards, add your UI using /addUI and test your dimensions using /test. Thank you for using BotBot!'},
        ]
        )
        .setImage('https://cdn.discordapp.com/attachments/734599702636658712/1006679626619305994/wildriftcorrectui.jpg')   
        .setTimestamp()
        .setFooter({ text: 'BotBot was created by Airose (airoz#8575)' });
        const sentMessage = await interaction.reply({ embeds: [exampleEmbed], fetchReply: true, });
        sentMessage.react('✅');
        const filter = (reaction, user) => {
            return reaction.emoji.name == ['✅'] && user.id === interaction.user.id;
        };
        const collector = sentMessage.createReactionCollector({ filter, time: 15000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            if (collected.size > 0){
                if (tag == null){
                    SetupFile.create({ read_info: true });
                } 
                else{
                    tag.update({read_info : true })
                } 

            }
        });
	},
};