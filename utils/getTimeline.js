let request = require('request');
const fs = require('fs');
const moment = require('moment');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('config.json')
const db = low(adapter)

module.exports = {
  getTimeline: () => {
    db.read()
    let year = db.get('EpitechYear').value();
    let options = {
      'method': 'GET',
      'url': `https://gitlab.com/epi-codes/Epitech-2023-Timeline/-/raw/master/data/timeline-${year}.json`,
      'headers': {}
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      fs.writeFile("utils/time.json", `{"fetchTime": "${moment().format()}"}`, function(err) {
        if(err)
          return console.log(err);
      })
      fs.writeFile("utils/timeline.json", response.body, function(err) {
        if(err)
          return console.log(err);
      }); 
    });
  }
}