const Discord = require('discord.js');
const fs = require('fs');
const Config = require('../config.js');
const Logger = require('../logger.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.addadminrole = async function(message, msg, args, discordclient) {
  
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
    let servers = Config.getservers()
    servers[message.guild.id].prefix = args[1]
    Config.setservers(servers);
    Config.writeToFile();
    message.channel.send(`:white_check_mark: \`The prefix for ${message.guild.name} is now ${args[1]} \``);
  } else {
    message.channel.send(':no_entry_sign: \`No new prefix specified\`')
  }
}

module.exports.setgame = async function(message, msg, args, discordclient) {
  if (args[1]) {
    let newGame = '';
    for (let i = 1; i < args.length; i++) {
      newGame += args[i] + ' ';
    }

    Config.getconfig().NowPlaying = newGame;
    Config.writeToFile();
    discordclient.user.setActivity(Config.getconfig().NowPlaying);
    message.channel.send(`:white_check_mark: \`Jeffery's game is now ${newGame} \``);
  } else {
    message.channel.send(':no_entry_sign: \`No new game specified\`')
  }
}

module.exports.dumpRoles = async function(message, msg, args, discordclient) {
  let output = 'Role name              | Role Snowflake ID \n---------------------------------------------------\n'
  let padding = 22;

  message.guild.roles.array().forEach((role) => {
    let nameLength = role.name.length;
    let spacing = padding - nameLength;
    let rolename = role.name;
    let roleID = role.id;

    output += rolename;
    for (let i = 0; i < spacing; i++) {
      output += ' ';
    }
    output += ' | ';

    output += roleID + '\n';
  });

  message.channel.send('```' + output + '```');
}