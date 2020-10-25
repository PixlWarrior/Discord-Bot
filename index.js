const Discord = require("discord.js");

const bot = new Discord.Client();

require("dotenv").config();

const token = process.env.BOT_TOKEN;

const keepalive = require("./src/keepalive.js");

keepalive.createServer(8080);

const pf = "$";

//init bot
bot.on("ready", () => {
  console.log(bot.user.username + " is alive");
  bot.user.setActivity(pf + "help for help");
});

//when someone says something, console.logs it
bot.on("message", (message) => {
  if (message.author === !bot) {
    console.log(message.author.username + ": " + message.content);
  }
});

//kick sequence
bot.on("message", (message) => {
  //if(message.author.username === !'BotBotBotBotBot') {
  let guildMember = message.guild.members.cache.find(
    (m) => m.id == message.author.id
  );

  if (!message.guild) return;

  if (message.content.startsWith(pf + "kick")) {
    if (!guildMember.hasPermission("KICK_MEMBERS")) {
      return message.channel
        .send("**Error**, you don't have enough permissions to kick this user")
        .then((m) => m.delete(10000))
        .catch((err) => console.error(err));
    } else if (
      !message.guild.members.cache
        .find((m) => m.id == bot.user.id)
        .hasPermission("KICK_MEMBERS")
    ) {
      return message.channel
        .send("**Error**, I don't have enough permissions to kick this user")
        .then((m) => m.delete(10000))
        .catch((err) => console.error(err));
    } else if (!guildMember.kickable) {
      return message.channel
        .send("**Error**, I am unable to kick this user")
        .then((m) => m.delete(10000))
        .catch((err) => console.error(err));
    }

    const member = message.mentions.members.first();
    if (member) {
      member
        .kick()
        .then(() => {
          message.reply(`succesfully kicked ${member.tag}`);
        })
        .catch((err) => {
          message.reply("I was unable to kick the member");

          console.error(err);
        });
    } else {
      message.reply("You didn't mention the user you wanted to kick!");
    }
  }
  //}
});

//ban sequence
bot.on("message", (message) => {
  //if(message.author.username === !'BotBotBotBotBot') {
  if (!message.guild) return;

  if (message.content.startsWith(pf + "ban")) {
    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .ban()
          .then(() => {
            message.reply(`succesfully banned ${user.tag}`);
          })
          .catch((err) => {
            message.reply("I was unable to ban the member");

            console.error(err);
          });
      } else {
        message.reply("That member isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user you wanted to ban!");
    }
  }
  //}
});

//simple ping script
bot.on("message", (message) => {
  if (message.content === "Ping" || message.content === "ping") {
    message.channel.send("Pong!");
  }

  if (message.content === "Pong" || message.content === "pong") {
    message.reply("Wrong Way! Try saying 'Ping' instead!");
  }
});

bot.on("message", (message) => {
  if (message.content === pf + "desc") {
    message.channel.send(
      "I am a barely functioning discord bot that is in heavy developememnt right now. Check back later for real results."
    );
  }
});

bot.on("message", (message) => {
  if (message.content.startsWith(pf + "help")) {
    message.channel.send("**Help Page:**");
    message.channel.send("The current Prefix is: `" + pf + "`");
    message.channel.send("Try saying 'Ping'");
    message.channel.send(
      "do `" +
        pf +
        "desc` for a description \n **For admins**\n`" +
        pf +
        "kick`\n`" +
        pf +
        "ban`"
    );
  }
});

bot.login(token);
