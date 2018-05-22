const Discord = require('discord.js');
const fs = require('fs');
const Config = require('../config.js');
const Logger = require('../logger.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.addadminrole = function(message, msg, args, discordclient) {
  
}

module.exports.stop = async function(message, msg, args, discordclient) {
  message.channel.send(':white_check_mark: \`Disconnected...\`');
  Logger.failed('Disconnected');
  discordclient.destroy();
}

module.exports.reload = async function(message, msg, args, discordclient) {
  try {
    Config.loadFromFile();
    message.channel.send(':white_check_mark: \`Configuration reloaded...\`');
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`Could not load the config: ${e.message}\``);
  }
}

module.exports.setprefix = async function(message, msg, args, discordclient) {
  if (args[1]) {
    var servers = Config.getservers()
    servers[message.guild.id].prefix = args[1]
    Config.setservers(servers);
    Config.writeToFile();
    message.channel.send(`:white_check_mark: \`The prefix for ${message.guild.name} is now ${args[1]} \``);
  } else {
    message.channel.send(':no_entry_sign: \`No new prefix specified\`')
  }
}

module.exports.setgame = async function(message, msg, args, discordclient) {

}
