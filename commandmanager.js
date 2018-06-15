const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const MultiServerCommands = require('./commands/multiservercommands')
const SpaceCommands = require('./commands/spacecommands')
const AdminCommands = require('./commands/admincommands')
const CommandManager = require('./main');

let commands = {};

module.exports.commands = commands;

function addCommand(name, command, alt, usage, desc, requrePerms, functionReference) {
  commands[command] = {
    name: name,
    command: command,
    alt: alt,
    usage: usage,
    desc: desc,
    requrePerms: requrePerms,
    functionReference: functionReference
  }
}

/*command name, command, alt, usage, description, require permission, reference*/

module.exports.loadCommands = function() {
  //general commands
  addCommand('Help', 'help', undefined, 'help [command] or help', 'Returns a usage chart for the command requested, or returns a link to a command list', false, Commands.help);
  addCommand('Say', 'say', undefined, 'say [input]', 'Repeats the input', false, Commands.say);
  addCommand('Version', 'version', undefined, 'version', 'Returns the version', false, Commands.version);
  addCommand('Ping', 'ping', undefined, 'ping', 'Returns round trip time to discords servers', false, Commands.ping);
  addCommand('Cat', 'cat', undefined, 'cat', 'Returns a picture of a cat', false, Commands.cat);
  addCommand('Dog', 'dog', undefined, 'dog', 'Returns a picture of a dog', false, Commands.dog);
  addCommand('Undo', 'undo', undefined, 'undo', 'Deletes last message sent by Jeffery from the channel the command was issued in', false, Commands.undo);
  addCommand('HUG', 'hug', undefined, 'hug', 'Sends cutest hugs', false, Commands.hug);
  addCommand('Pallet', 'pallet', undefined, 'pallet [number of colours]', 'Returns a random colour palet with the amount of colours specified (2-7)', false, Commands.pallet);
  addCommand('QR Code', 'qr', undefined, 'qr [string]', 'Generates a QR code from the string of text provided', false, Commands.qr);
  
  //rule commands
  addCommand('Rules', 'rules', undefined, 'rules', 'Returns all the rules for the server the command was issued in', false, MultiServerCommands.rules);
  addCommand('Rule', 'rule', undefined, 'rule [rule number]', 'Returns corresponding rule for the server the command was issued in', false, MultiServerCommands.rule);
  addCommand('Add Rule', 'addrule', undefined, 'addrule [new rule]', 'Adds a rule to the rule list for the server the command was issued in', true, MultiServerCommands.addrule);
  addCommand('Delete Rule', 'delrule', undefined, 'delrule [rule number]', 'Deletes the corresponding rule for the server the command was issued in', true, MultiServerCommands.delrule);
  addCommand('EditRule', 'editrule', undefined, 'editrule [rule number] [new rule]', 'Edits the corresponding rule for the server the command was issued in', true, MultiServerCommands.editrule);
  
  //birthday commands
  addCommand('Add Birthday', 'addbirthday', undefined, 'addbirthday [DD/MM/YYYY] [Who\'s birthday]', 'Adds a users birthday for the server the command was issued in, including a date and a name', false, MultiServerCommands.addbirthday);
  addCommand('Delete Birthday', 'delbirthday', undefined, 'delbirthday [Who\'s birthday]', 'Deletes a users birthday for the server the command was issued in', false, MultiServerCommands.delbirthday);
  addCommand('Next Birthday', 'nextbirthday', undefined, 'nextbirthday', 'Returns the next persons birthday and the date of their birthday on the server the command was issued in', false, MultiServerCommands.delbirthday);
  addCommand('All Birthdays', 'allbirthdays', undefined, 'allbirthdays', 'Returns a list of all the birthdays registered on the server the command was issued on', false, MultiServerCommands.allbirthdays);

  //vote commands
  addCommand('Poll', 'poll', undefined, 'poll start [poll name/question] [--option1--option2...] or poll stop or poll view', 'Starts/stops an automated poll with the options given as a fourth argument to \'poll start\' and are seperated with --s, stopping a poll will produce the results. Veiwing a poll will produce the options', false, MultiServerCommands.poll);
  addCommand('Vote', 'vote', undefined, 'vote [option]', 'Places your vote on the option you chose, based on the running poll in the server the \'poll start\' command was issued in', false, MultiServerCommands.vote);

  //space commands
  addCommand('Next Launch', 'nextlaunch', undefined, 'nextlaunch', 'Returns information on the next significant space flight in the space industry', false, SpaceCommands.nextlaunch);
  addCommand('Space Image', 'spaceimg', undefined, 'spaceimg [latitude];[longitude]', 'Returns a satelite image of the specified location taken the day before', false, SpaceCommands.spaceimg);

  //chess commands
  addCommand('Start Game', 'startgame', undefined, 'startgame [user you want to play againt\'s tag', 'Starts a chess game against you and the user you choose to play', false, MultiServerCommands.startGame);

  //admin commands
  addCommand('Shutdown', 'stop', undefined, 'stop', 'Shutsdown JefferyBot', true, AdminCommands.stop);
  addCommand('Reload', 'reload', undefined, 'reload', 'Reloads the server config and the misc config', false, AdminCommands.reload);
  addCommand('Set Prefix', 'setprefix', undefined, 'setprefix [new prefix]', 'Changes Jeffery\'s prefix in the server it was issued in to the new prefix', true, AdminCommands.setprefix);
  addCommand('Set Game', 'setgame', undefined, 'setgame [new game]', 'Changes Jeffery\'s game to the new game', true, AdminCommands.setgame);
  addCommand('Dump Roles', 'dumproles', undefined, 'dumproles', 'Dumps the servers roles and their ID\'s', false, AdminCommands.dumpRoles);
}
