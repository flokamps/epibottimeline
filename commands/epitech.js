const moment = require('moment');
const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('utils/timeline.json')
const db = low(adapter)

module.exports = {
	name: 'epitech',
    description: 'Get all beginning projects for the next month',
    aliases: ['projects', 'project', 'new'],
	execute(message, args) {
        db.read()
        let timeLineEmbed = new Discord.MessageEmbed();
        timeLineEmbed.setTitle("Next month");
        let timeline = db.value();
        let i = 0;
		timeline.projects.forEach(element => {
            let actual = moment();
            let startDate = moment(element.start);
            if (actual.isBefore(startDate) && startDate.isBefore(moment(actual).add(1, 'month')) && startDate.isAfter(actual)) {
                timeLineEmbed.addField(`${element.module} - ${element.project}`, '```' + `Start registering ${moment(element.start).format("dddd Do MMMM")}\nEnd of project ${moment(element.end).format("dddd Do MMMM")}` + '```');
                i++;
            }
        });
        if (i == 0)
            timeLineEmbed.setDescription("No projects for the next month. have good holidays!");
        message.channel.send(timeLineEmbed);
	},
};