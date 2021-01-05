# EpiBot Timeline
A simple Discord bot who monitor your differents projects during the year.

## Installation
```
git clone https://github.com/RootMestudy/epibottimeline
```
```
mv config.json.example config.json
```
Replace differents informations on the JSON file:
```json
{
    "discordToken": "qhzdoiqzhddhOPZHDMDQw.Xe_T9A.7OKTdhzIZANdcsVup-UmrKna9EYM3A",
    "discordPrefix": "!",
    "discordChannel": "général",
    "EpitechYear": "2025"
}
```
```
npm i
```
Then you can startup the bot:
```
node index.js
```

## Features
Auto message on predefined channel

![Auto messsage](https://i.imgur.com/tr41zR5.png)

All future projects for the next month with command ```epitech```

![Epitech command](https://i.imgur.com/9FundFt.png)

(Simple error handling)

![Error Handling](https://i.imgur.com/D8NnEHw.png)

Reload projects with the ```fetch``` command

![Fetch command](https://i.imgur.com/I0SGz0A.png)

(Auto reload every 24h)

## Contributors
Feel free to contribute to this project by pull request!