const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const CommandManager = require('./main');
const http = require('http');
const ping = require('ping');
const fs = require('fs');
const Discord = require('discord.js');

var commands = {};

module.exports.commands = commands;

function addCommand(name, command, alt, usage, desc, requrePerms, functionReference) {
    commands[name] = {
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
    addCommand('say', 'say', undefined, 'say [input]', 'repeats the input', false, Commands.say);
    addCommand('version', 'version', undefined, 'version', 'returns the version', false, Commands.version);
    addCommand('ping', 'ping', undefined, 'ping', 'returns round trip to discords serves', false, Commands.ping);
    //continue
}
