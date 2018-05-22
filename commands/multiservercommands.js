const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

/*rule commands*/
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
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``);
    return;
  }
  var em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully edited!');
  em.addField(`Rule ${args[1]}:`, newRule);
  message.channel.send(em);
}

/*poll commands*/
var polls = {};

module.exports.poll = async function(message, msg, args, discordclient) {
  if (args[1] == 'start') {
    if (args[2]) {
      if (!polls[message.guild.id]) {
        await startPoll(message, args);
        var options = '';
        for (i in polls[message.guild.id].options) {
          options += polls[message.guild.id].options[i] + ', ';
        }
        options = options.substring(0, options.length - 2);

        var em = new Discord.RichEmbed();
        em.setTitle('Poll started!');
        em.setColor('BLUE');
        em.addField('With the options:', options)
        em.setFooter('Type \'vote [option]\' to vote for that option');
        message.channel.send(em);
        return;
      } else {
        message.channel.send(':no_entry_sign: \`There is allready a poll running, you can type \'poll stop\' to stop it and find its results\`');
        return;
      }
    } else {
      message.channel.send(':no_entry_sign: \`No options given, try \'help poll\' for usage\`');
      return;
    }
  } else if (args[1] == 'stop') {
    if (polls[message.guild.id]) {

      var results = polls[message.guild.id].votes
          .map((x, i) =>
              {
                  return {
                      count: x,
                      value: polls[message.guild.id].options[i]
                  };
               }
          )
          .sort((a, b) => b.count - a.count)
          .filter((x, i, arr) => x.count == arr[0].count)
          //.map(x => x.value)

      var winners = '';
      var votesForWinners = '';

      for (var i = 0; i < results.length; i++) {
          winners += results[i].value + ' and ';
          votesForWinners = results[i].count;
      }
      winners = winners.substring(0, winners.length - 5);

      var em = new Discord.RichEmbed();
      em.setTitle('Poll Results');
      em.setColor('BLUE');
      em.addField(winners + ' wins!', 'with ' + votesForWinners + ' vote(s)');
      message.channel.send(em);
      delete polls[message.guild.id];
      return;
    } else {
      message.channel.send(':no_entry_sign: \`There are no polls running, you can type \'poll start\' to start a new poll\`');
      return;
    }
  } else {
    message.channel.send(':no_entry_sign: \`Incorrect arguments given, try \'help poll\' for usage\`');
    return;
  }
}

module.exports.vote = async function(message, msg, args, discordclient) {
  if (polls[message.guild.id]) {
    var poll = polls[message.guild.id];
    var hasVoted = false;
    for (var i = 0; i < poll.voted.length; i++) {
      if (poll.voted[i] == message.author.id) {
        hasVoted = true;
      }
    }
    if (!hasVoted) {
      var option = args.slice(1).join(" ");
      var index;

      for (var i = 0; i < poll.options.length; i++) {
        if (poll.options[i] == option) {
          index = i
          poll.votes[i]++;
          break;
        }
      }

      if (index == undefined) {
        message.channel.send(':no_entry_sign: \`That is not an option!\`');
        return;
      }

      poll.voted.push(message.author.id);
      polls[message.guild.id] = poll;

      message.channel.send(`${message.author} voted for ${option}!`);
      //console.log(polls);
    } else {
      message.channel.send(':no_entry_sign: \`You have allready voted\`');
    }
  } else {
    message.channel.send(':no_entry_sign: \`There are no polls running at the moment, use \'poll start\' to start one\`');
  }
}

async function startPoll(messageObj, args) {
  var parsedOptions =args.slice(2).join(" ").match(/(\\.|[^/])+/g)
  var parsedVotes = await getStartingVotes(parsedOptions)
  polls[messageObj.guild.id] = {
    options: parsedOptions,
    votes: parsedVotes,
    voted: []
  }
}

async function getStartingVotes(options) {
  var votes = [];
  for (i in options) {
    votes.push('0');
  }
  return votes;
}
