const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.help = async function(message, msg, args, discordclient) {
  var commands = CommandManager.commands;
  if (args[1]) {
    if (commands[args[1].toLowerCase()]) {
      var em = new Discord.RichEmbed();
      em.setColor('BLUE');
      em.setTitle(commands[args[1]].name);
      em.addField('Command:', commands[args[1]].command);
      if (commands[args[1]].alt != undefined) {
        em.addField('Alt:', commands[args[1]].alt)
      }
      em.addField('Usage:', '\`' + commands[args[1]].usage + '\`');
      em.addField('Description:', commands[args[1]].desc);

      message.channel.send(em)
    } else {
      message.channel.send(`:no_entry_sign: \`That command does not exist\``);
    }
  } else {
    message.channel.send(`See a full command list at http://www.plane000.co.uk`); //temporary
  }
}

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

module.exports.hug = function(message, msg, args, discordclient) {
  var em = new Discord.RichEmbed();
  em.setImage('https://cdn.discordapp.com/attachments/345580737149403146/442232811605458957/cat-instantly-hugs-plush-toy.gif');
  message.channel.send(em);
}