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
        setTimeout(() => {
            time.read()
            let time1 = moment(time.get('fetchTime').value()).toDate();
            time1 = time1.toString();
            let actual = moment().subtract(1, 'seconds').toDate();
            actual = actual.toString();
            assert.strictEqual(time1, actual);
        }, 1000);
    });
});