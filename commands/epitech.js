let timeline = require('../utils/timeline.json');
const moment = require('moment');
const Discord = require('discord.js');

module.exports = {
	name: 'epitech',
	description: 'Get all beginning projects for the next month',
	execute(message, args) {
        let timeLineEmbed = new Discord.MessageEmbed();
        timeLineEmbed.setTitle("Next month");
        delete require.cache[require.resolve('../utils/timeline.json')]
        timeLine = require("../utils/timeline.json");
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