const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const MultiServerCommands = require('./commands/multiservercommands')
const AdminCommands = require('./commands/admincommands')
const CommandManager = require('./main');

var commands = {};

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
    addCommand('Help', 'help', undefined, 'help [command] or [help]', 'Returns a usage chart for the command requested, or returns a link to a command list', false, Commands.help);
    addCommand('Say', 'say', undefined, 'say [input]', 'Repeats the input', false, Commands.say);
    addCommand('Version', 'version', undefined, 'version', 'Returns the version', false, Commands.version);
    addCommand('Ping', 'ping', undefined, 'ping', 'Returns round trip time to discords servers', false, Commands.ping);
    addCommand('Cat', 'cat', undefined, 'cat', 'Returns a picture of a cat', false, Commands.cat);
    addCommand('Dog', 'dog', undefined, 'dog', 'Returns a picture of a dog', false, Commands.dog);
    addCommand('Undo', 'undo', undefined, 'undo', 'Deletes last message sent by Jeffery from the channel the command was issued in', false, Commands.undo);

    //rule commands
    addCommand('Rules', 'rules', undefined, 'rules', 'Returns all the rules for the server the command was issued on', false, MultiServerCommands.rules);
    addCommand('Rule', 'rule', undefined, 'rule [rule number]', 'Returns corresponding rule for the server the command was issued on', false, MultiServerCommands.rule);
    addCommand('Add Rule', 'addrule', undefined, 'addrule [new rule]', 'Adds a rule to the rule list for the server the command was issued on', true, MultiServerCommands.addrule);
    addCommand('Delete Rule', 'delrule', undefined, 'delrule [rule number]', 'Deletes the corresponding rule for the server the command was issued on', true, MultiServerCommands.delrule);
    addCommand('EditRule', 'editrule', undefined, 'editrule [rule number] [new rule]', 'Edits the corresponding rule for the server the command was issued on', true, MultiServerCommands.editrule);

    //vote commands
    addCommand('Poll', 'poll', undefined, 'poll start [option1/option2...] or poll stop', 'Starts/stops an automated poll with the options given as a third argument to \'poll start\' and are seperated with a \'/\' with no spaces, stopping a poll will produce the results', false, MultiServerCommands.poll);
    addCommand('Vote', 'vote', undefined, 'vote [option]', 'Places your vote on the option you chose, based on the running poll in the server the \'poll start\' command was issued in', false, MultiServerCommands.vote);

    //admin commands
    addCommand('Shutdown', 'stop', undefined, 'stop', 'Shutsdown JefferyBot', true, AdminCommands.stop);
    addCommand('Reload', 'reload', undefined, 'reload', 'Reloads the server config and the misc config', false, AdminCommands.reload);
    addCommand('Set Prefix', 'setprefix', undefined, 'setprefix [new prefix]', 'Changes Jeffery\'s prefix to the new prefix', true, AdminCommands.setprefix);
    addCommand('Set Game', 'setgame', undefined, 'setgame [new game]', 'Changes Jeffery\'s game to the new game', true, AdminCommands.setgame);
}
