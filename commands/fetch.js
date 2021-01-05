const { getTimeline } = require('../utils/getTimeline');

module.exports = {
	name: 'fetch',
	description: 'Fetch the list of projects for the year',
	execute(message, args) {
		getTimeline();
	},
};