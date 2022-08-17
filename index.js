
const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');
const Tesseract = require('tesseract.js');
const jimp = require('jimp');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { PermissionsBitField } = require('discord.js');
const { InteractionType } = require('discord.js');
const { Users, IndividualContribution, UI, SetupFile } = require('./dbObjects.js')

const client = new Client({ 
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions
	] 
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (interaction.type == InteractionType.ApplicationCommandAutocomplete){
		const command = client.commands.get(interaction.commandName);
		if(!command) return;
		try{
			await command.autocomplete(interaction, client);
		} catch (err){
			console.error(error);
		}
	}
	else if (interaction.isChatInputCommand()){
		const command = client.commands.get(interaction.commandName);
		
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}


});

let currentWeek = 1;

async function updateWeek(){
	currentWeek = currentWeek +1;
}

async function addContribution (name, points){
	const affectedRows = await Users.update({ contribution: points }, { where: { user_id: name } });

	if (affectedRows > 0) {
		storeContribution(name, points);
		return
	}
	else{
		storeContribution(name,points);
		return Users.create({ user_id: name, contribution: points });
	}
}

async function storeContribution (name, points){
	week = "week"+currentWeek;
	const tag = await IndividualContribution.findOne({ where: { user_id: name } });
	if (tag){
		totalPoints = await tag.getDataValue('total') + parseInt(points);
		await IndividualContribution.update({ total: totalPoints }, { where: { user_id: name } });
	}

	const affectedRows = await IndividualContribution.update({ week: points }, { where: { user_id: name } });
	updateWeek();

	if (affectedRows > 0) {
		return
	}
	else{
		return IndividualContribution.create({ user_id: name, week : points, total : points });
	}
}

client.on('messageCreate', async (msg) => {
	if(msg.author.bot) return;
	const image = msg.attachments.first();
	if(image){
		const imagecard = await jimp.read(image.proxyURL)
		imagecard.invert()
		imagecard.crop(284,288,630,670)
		imagecard.grayscale().write('Result.png');
		msg.reply({files: ["Result.png"]})
		Tesseract.recognize(
			"Result.png",
			"eng",
			{ logger: (m) => console.log(m) }
		  ).then(({ data: { text } }) => {
			// Replying with the extracted test
			const dataArray = text.split(/(?:\r?\n)+/);
			console.log(dataArray);

			for(var i = 0; i < dataArray.length-1; i += 2) {
				const tagName = dataArray[i];
				console.log(tagName);
				const tagContribution = dataArray[1+i].slice(-4).trim();
				console.log(tagContribution)
				addContribution(tagName, tagContribution);
			}

			console.log(text);
			msg.reply(text);
		  });		
		return;
	}
	console.log("not an image")
	return;
}
)

  

client.login(token);
