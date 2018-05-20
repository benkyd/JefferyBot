const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config');

/*message object, messaage full, message args, discord client*/

module.exports.rules = function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`Rules`);

}

module.exports.rule = function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`Rule`);

}

module.exports.addrule = function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`AddRule`);

}

module.exports.delrule = function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`DelRule`);

}

module.exports.editrule = function(message, msg, args, discordclient) {
  var serverID = message.guild.id;
  var serversConfig = Config.getservers;
  message.channel.send(`EditRule`);

}
