const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const request = require('request');
const colors = require('colors');
const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const CommandManager = require('./commandmanager');

module.exports.requestPromise = async function(url) {
  return new Promise((resolve, reject) => {
    request(url, function(error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
}

module.exports.isUserAdmin = function(message) {
  if (message.author.id == Config.getconfig().OwnerID) {
    return true;
  }
  message.author.roles.array.forEach(role => {
    let r = role.id;
    Config.getservers()[message.guild.id].adminroles.forEach((e) => {
      if (r == e) {
        return true;
      }
    });
  });
  return false;
}

module.exports.sleep = function(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
 
