const Discord = require('discord.js');
const fs = require('fs');
const Config = require('../config.js');
const Logger = require('../logger.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.addadminrole = function(message, msg, args, discordclient) {
  
}

module.exports.stop = function(message, msg, args, discordclient) {
  message.channel.send(':white_check_mark: \`Disconnected...\`');
  Logger.failed('Disconnected');
  discordclient.destroy();
}

module.exports.reload = function(message, msg, args, discordclient) {
  try {
    Config.loadFromFile();
    message.channel.send(':white_check_mark: \`Configuration reloaded...\`');
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`Could not load the config: ${e.message}\``);
  }
}

module.exports.setprefix = function(message, msg, args, discordclient) {
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

module.exports.setgame = function(message, msg, args, discordclient) {
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

module.exports.dumpRoles = function(message, msg, args, discordclient) {
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

module.exports.serverconfig = async function (message, msg, args, discordclient) {
  if (message.author.id == Config.getconfig().OwnerID) {//bot owners id
    message.channel.send('Uploading...')
    
    let atm = new Discord.Attachment();
    atm.setAttachment('./resources/servers.json', 'Servers.json');

    message.channel.send(atm);
    
    await Helper.sleep(40);
    message.channel.fetchMessages({ limit: 10 })
    .then((_messages) => {
      let messages = _messages.array();
      let counter = 0;
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].author.id === discordclient.user.id) {
          if (counter == 0) {
            counter++;
          } else {
            messages[i].delete();
            return;
          }
        }
      }
    })
    .catch();
  } else {
    message.channel.send(':no_entry_sign: \`You are not authorized to issue this command\`')
  }
}