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

  try {
    var rule = Rules[args[1]];
    message.channel.send(`Rule ${args[1]}: ${rule}`);
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
  }
}

module.exports.addrule = async function(message, msg, args, discordclient) {
  var serverName = message.guild.name;
  var serverID = message.guild.id;
  var serversConfig = Config.getservers();
  var Rules = serversConfig[serverID].rules;

  var newRule = args[1] + ' ';
  for (var i = 2; i < args.length; i++) {
    newRule += args[i] + ' ';
  }

  try {
    Rules.push(newRule);
    serversConfig[serverID].rules = Rules;
    Config.writeToFile();
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`Somthing went wrong\``);
    return;
  }

  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully added!');
  em.addField(`Rule ${Rules.length - 1}:`, newRule);
  message.channel.send(em);
}

module.exports.delrule = async function(message, msg, args, discordclient) {
  var serverName = message.guild.name;
  var serverID = message.guild.id;
  var serversConfig = Config.getservers();
  var Rules = serversConfig[serverID].rules;

  var toDelete = args[1];

  try {
    Rules.splice(toDelete, 1);
    serversConfig[serverID].rules = Rules;
    Config.writeToFile();
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
    return;
  }

  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully deleted!');
  em.addField(`Rule ${toDelete} deleted`, 'All subsiquent rules pushed one space to the left');
  message.channel.send(em);
}

module.exports.editrule = async function(message, msg, args, discordclient) {
  var serverName = message.guild.name;
  var serverID = message.guild.id;
  var serversConfig = Config.getservers();
  var Rules = serversConfig[serverID].rules;

  var newRule = args[2] + ' ';
  for (var i = 3; i < args.length; i++) {
    newRule += args[i] + ' ';
  }

  try {
    Rules[args[1]] = newRule;
    serversConfig[serverID].rules = Rules;
    Config.writeToFile();
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
    return;
  }
  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully edited!');
  em.addField(`Rule ${args[1]}:`, newRule);
  message.channel.send(em);
}
