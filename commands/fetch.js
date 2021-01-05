const { getTimeline } = require('../utils/getTimeline');
let timeLine = require('../utils/timeline.json');

module.exports = {
	name: 'fetch',
	description: 'Fetch the list of projects for the year',
	execute(message, args) {
		delete require.cache[require.resolve('../utils/timeline.json')]
        timeLine = require("../utils/timeline.json");
		getTimeline();
	},
};