const { getTimeline } = require('../utils/getTimeline');
const assert = require('assert').strict;
const moment = require('moment');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('utils/time.json')
const time = low(adapter)

describe("Integration test", function() {
    it("should be able to fetch dynamically all projects", function() {
        getTimeline();
        assert.notStrictEqual(moment(time.get('fetchTime').value()), moment());
    });
});