const logger = require('./logger');
const Discord = require('discord.js');
const client = new Discord.Client();


client.login('');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    logger.logMSG(msg);
    msg.reply('pong');
  }

});
