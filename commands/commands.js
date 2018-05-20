const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config');

/*message object, messaage full, message args, discord client*/

module.exports.say = function(message, msg, args, discordclient) {

}

module.exports.version = function(message, msg, args, discordclient) {
  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Version:');
  em.setDescription(Config.getconfig().Version);
  message.channel.send(em);
  return;
}

module.exports.ping = function(message, msg, args, discordclient) {
  ping.promise.probe("discordapp.com", {
      timeout: 10
  }).then((output) => {
      message.channel.send(`:white_check_mark: \`${output.avg}ms\``);
  });
}
