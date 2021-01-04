const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const { discordToken, discordPrefix, discordChannel } = require('./config.json');
const { getTimeline } = require('./utils/getTimeline');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./utils/time.json');
const timeline = low(adapter);
const moment = require('moment');
const { cpuUsage } = require('process');
const adapter2 = new FileSync('./utils/timeline.json');
const db = low(adapter2);
let timeLineRaw = require('./utils/timeline.json');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

getTimeline();

setInterval(() => {
    db.read();
    delete require.cache[require.resolve('./utils/timeline.json')]   // Deleting loaded module
    timeLineRaw = require("./utils/timeline.json");
    let actual = moment().format();
    let fetchTime = moment(timeline.get('fetchTime').value());
    const channel = client.channels.cache.find(channel => channel.name === discordChannel);
    if (moment(actual).isAfter(fetchTime.add(1, 'days')))
        getTimeline();
    timeLineRaw.projects.forEach(element => {
        let timeLineEmbed = new Discord.MessageEmbed();
        timeLineEmbed.setTitle(element.project);
        let projectStart = moment(element.start);
        let projectStartPlusOneMonth = moment(projectStart).add(2, 'weeks');
        if (moment(actual).isAfter(projectStart) && moment(actual).isBefore(projectStartPlusOneMonth)) {
            timeLineEmbed.addField(`${element.module} - ${element.project}`, '```' + `Start registering ${moment(element.start).format("dddd Do MMMM")}\nEnd of project ${moment(element.end).format("dddd Do MMMM")}` + '```');
            channel.send(timeLineEmbed);
            db.get('projects').remove({project: element.project}).write();
        }
    });
}, 3000);

client.on('message', message => {
    if (!message.content.startsWith(discordPrefix) || message.author.bot) return;

    const args = message.content.slice(discordPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('there was an error trying to execute that command!');
    }
});

client.login(discordToken);