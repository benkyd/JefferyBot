const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const RuleCommands = require('./commands/rulecommands')
const CommandManager = require('./main');
const http = require('http');
const ping = require('ping');
const fs = require('fs');
const Discord = require('discord.js');

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
    addCommand('Ping', 'ping', undefined, 'ping', 'Returns round trip to discords servers', false, Commands.ping);
    addCommand('Cat', 'cat', undefined, 'cat', 'Returns a picture of a cat', false, Commands.cat);
    addCommand('Dog', 'dog', undefined, 'dog', 'Returns a picture of a dog', false, Commands.dog);
    addCommand('Undo', 'undo', undefined, 'undo', 'Deletes last message sent by Jeffery from the channel the command was issued in', false, Commands.undo);

    //rule commands
    addCommand('Rules', 'rules', undefined, 'rules', 'Returns all the rules for the server the command was issued on', false, RuleCommands.rules);
    addCommand('Rule', 'rule', undefined, 'rule [rule number]', 'Returns corresponding rule for the server the command was issued on', false, RuleCommands.rule);
    addCommand('AddRule', 'addrule', undefined, 'addrule [new rule]', 'Adds a rule to the rule list for the server the command was issued on', true, RuleCommands.addrule);
    addCommand('DelRule', 'delrule', undefined, 'delrule [rule number]', 'Deletes the corresponding rule for the server the command was issued on', true, RuleCommands.delrule);
    addCommand('EditRule', 'editrule', undefined, 'editrule [rule number] [new rule]', 'Edits the corresponding rule for the server the command was issued on', true, RuleCommands.editrule);

}
