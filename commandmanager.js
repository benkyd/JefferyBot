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
    addCommand('Say', 'say', undefined, 'say [input]', 'repeats the input', false, Commands.say);
    addCommand('Version', 'version', undefined, 'version', 'returns the version', false, Commands.version);
    addCommand('Ping', 'ping', undefined, 'ping', 'returns round trip to discords servers', false, Commands.ping);
    addCommand('Cat', 'cat', undefined, 'cat', 'returns a picture of a cat', false, Commands.cat);
    addCommand('Dog', 'dog', undefined, 'dog', 'returns a picture of a dog', false, Commands.dog);
    addCommand('Undo', 'undo', undefined, 'undo', 'deletes last message sent by Jeffery from the channel the command was issued in', false, Commands.undo);

    //rule commands
    addCommand('Rules', 'rules', undefined, 'rules', 'returns all the rules for the server the command was issued on', false, RuleCommands.rules);
    addCommand('Rule', 'rule', undefined, 'rule [rule number]', 'returns corresponding rule for the server the command was issued on', false, RuleCommands.rule);
    addCommand('AddRule', 'addrule', undefined, 'addrule [new rule]', 'adds a rule to the rule list for the server the command was issued on', true, RuleCommands.addrule);
    addCommand('DelRule', 'delrule', undefined, 'delrule [rule number]', 'deletes the corresponding rule for the server the command was issued on', true, RuleCommands.delrule);
    addCommand('EditRule', 'editrule', undefined, 'editrule [rune number] [new rule]', 'edits the corresponding rule for the server the command was issued on', true, RuleCommands.editrule);

}
