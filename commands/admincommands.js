const Discord = require('discord.js');
const fs = require('fs');
const Config = require('../config.js');
const Logger = require('../logger.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.stop = async function(message, msg, args, discordclient) {
  message.channel.send(':white_check_mark: \`Disconnected...\`');
  Logger.failed('Disconnected');
  discordclient.destroy();
  //discordclient.disconnect();
}

module.exports.reload = async function(message, msg, args, discordclient) {
  try {

  } catch (e) {

  }
}

module.exports.setprefix = async function(message, msg, args, discordclient) {

}

module.exports.setgame = async function(message, msg, args, discordclient) {

}
