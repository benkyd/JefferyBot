const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.say = async function(message, msg, args, discordclient) {
  message.channel.send(msg.slice(4, msg.length));
}

module.exports.version = async function(message, msg, args, discordclient) {
  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Version:');
  em.setDescription(Config.getconfig().Version);
  message.channel.send(em);
}

module.exports.ping = async function(message, msg, args, discordclient) {
  ping.promise.probe("discordapp.com", {
      timeout: 10
  }).then((output) => {
      message.channel.send(`:white_check_mark: \`${output.avg}ms\``);
  });
}

module.exports.cat = async function(message, msg, args, discordclient) {
   var url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1&api_key=MzA1Njcz';
   var result = await Helper.requestPromise(url);
   var output = result.match(/<url>(.*?)<\/url>/)[1];

   var em = new Discord.RichEmbed();
   em.setColor('BLUE');
   em.setImage(output);
   message.channel.send(em);
  }

module.exports.dog = async function(message, msg, args, discordclient) {
  var url = 'https://dog.ceo/api/breeds/image/random';
  try {
  var result = await Helper.requestPromise(url);
  var output = JSON.parse(result).message;
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`Somthing went wrong\``);
    return;
  }
  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setImage(output);
  message.channel.send(em);
}

module.exports.undo = function (message, msg, args, discordclient) {
  message.channel.fetchMessages({ limit: 50 })
  .then((_messages) => {
    var messages = _messages.array();
    for (var i = 0; i < messages.length; i++) {
      if (messages[i].author.id === discordclient.user.id) {
          messages[i].delete();
          return;
      }
    }
  })
  .catch();
};
