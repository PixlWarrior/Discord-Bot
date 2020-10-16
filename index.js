const Discord = require('discord.js');

const bot = new Discord.Client();

const token = process.env.BOT_TOKEN

console.log('Hello World')
bot.on('ready', () => {
  console.log(bot.user.username + 'is alive')
});

bot.on('message', message => {
  console.log(message.author.username + ' said ' + message.content)
})




