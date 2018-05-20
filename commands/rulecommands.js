const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config.js');
const Helper = require('../helper.js');


/*message object, messaage full, message args, discord client*/

module.exports.rules = async function(message, msg, args, discordclient) {
  var serverName = message.guild.name;
  var serverID = message.guild.id;
  var serversConfig = Config.getservers();
  var Rules = serversConfig[serverID].rules;

  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle(serverName + '\'s Server Rules');

  for (var i = 1; i < Rules.length; i++) {
    em.addField(`Rule ${i}:`, Rules[i]);
  }

  message.channel.send(em);
}

module.exports.rule = async function(message, msg, args, discordclient) {
  var serverName = message.guild.name;
  var serverID = message.guild.id;
  var serversConfig = Config.getservers();
  var Rules = serversConfig[serverID].rules;

  var rule = Rules[args[1]];
  try {
    message.channel.send(`Rule ${args[1]}: ${rule}`);
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
  }
}

module.exports.addrule = async function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`AddRule`);

}

module.exports.delrule = async function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`DelRule`);

}

module.exports.editrule = async function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`EditRule`);

}
