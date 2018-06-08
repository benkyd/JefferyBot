const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const qr = require('qr-image');
const Config = require('../config.js');
const CommandManager = require('../commandmanager.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.help = async function(message, msg, args, discordclient) {
  let commands = CommandManager.commands;
  if (args[1]) {
    if (commands[args[1].toLowerCase()]) {
      let em = new Discord.RichEmbed();
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
  let em = new Discord.RichEmbed();
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
   let url = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=1&api_key=MzA1Njcz';
   let result = await Helper.requestPromise(url);
   let output = result.match(/<url>(.*?)<\/url>/)[1];

   let em = new Discord.RichEmbed();
   em.setColor('BLUE');
   em.setImage(output);
   message.channel.send(em);
  }

module.exports.dog = async function(message, msg, args, discordclient) {
  let url = 'https://dog.ceo/api/breeds/image/random';
  try {
  let result = await Helper.requestPromise(url);
  let output = JSON.parse(result).messsage;
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`There was a problem with the API...\``);
    return;
  }
  let em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setImage(output);
  message.channel.send(em);
}

module.exports.undo = async function (message, msg, args, discordclient) {
  message.channel.fetchMessages({ limit: 50 })
  .then((_messages) => {
    let messages = _messages.array();
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].author.id === discordclient.user.id) {
          messages[i].delete();
          return;
      }
    }
  })
  .catch();
};

module.exports.hug = async function(message, msg, args, discordclient) {
  let em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setImage('https://cdn.discordapp.com/attachments/345580737149403146/442232811605458957/cat-instantly-hugs-plush-toy.gif');
  message.channel.send(em);
}

module.exports.pallet = async function(message, msg, args, discordclient) {
  if(args[1]) {
    if (args[1] <= 7) {
      if (args[1] >= 2) {
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let colours = args[1];
        let output = '';

        for (let i = 0; i < colours; i++) {
          let currentcol = '#';
          for (let j = 0; j < 6; j++) {
            let rnd = Math.floor(Math.random() * 16);
            currentcol += hex[rnd];
          }
          output += currentcol + ',  ';
        }
        output = output.substring(0, output.length - 3);
        
        let em = new Discord.RichEmbed();
        em.setColor('BLUE');
        em.addField(`Here are ${colours} random colours!`, output);

        message.channel.send(em);
      } else {
        message.channel.send(`:no_entry_sign: \`Too few colours entered (2-7)\``);
      }
    } else {
      message.channel.send(`:no_entry_sign: \`Too many colours entered (2-7)\``);
    }
  } else {
    message.channel.send(`:no_entry_sign: \`Please provide the ammount of colours you want (2-7)\``);
  }
}

module.exports.qr = async function(message, msg, args, discordclient) {
  if (args[1]) {
    message.channel.send('', new Discord.Attachment(qr.image(msg.substring(3), { type: 'png' })));
  }
  else {
    message.channel.send(':no_entry_sign: \`Please provide what you want turned into a QR code\`');
  }
}