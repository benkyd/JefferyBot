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
  let isAdmin = false;
  if(Config.getservers[message.guild.id].isUserAdmin) {

  }
}

module.exports.sleep = function(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
 
