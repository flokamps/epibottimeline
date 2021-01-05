const { getTimeline } = require('../utils/getTimeline');

module.exports = {
	name: 'fetch',
	description: 'Fetch the list of projects for the year',
	aliases: ['restart'],
	execute(message, args) {
		getTimeline();
		message.channel.send('Projects successfully refreshed');
	},
};