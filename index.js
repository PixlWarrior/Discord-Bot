const Discord = require('discord.js');

const bot = new Discord.Client();

const token = process.env.BOT_TOKEN

const keepalive = require('./keepalive.js')

//init bot
bot.on('ready', () => {
  console.log(bot.user.username + 'is alive')
});

//when someone says something, console.logs it
bot.on('message', message => {
  console.log(message.author.username + ': ' + message.content)
})

bot.login(token)