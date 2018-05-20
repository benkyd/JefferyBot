const colors = require('colors');
const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const CommandManager = require('./commandmanager');
const http = require('http');
const ping = require('ping');
const fs = require('fs');
const request = require('request');
const Discord = require('discord.js');

module.exports.requestPromise = function (url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
}
