const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const CommandManager = require('./commandmanager');
const http = require('http');
const ping = require('ping');
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

/*checks if config exists*/
if (!fs.existsSync('resources/config.json')) {
    Logger.log('Creating the config...');
    try {
        if (!fs.existsSync('resources/')) {
            fs.mkdirSync('resources/');
        }
        Config.loadDefaults();
        Config.writeToFile();
    }
    catch (e) {
        Logger.failed(`Could not create the config: ${e.message}`);
    }
}
/*loads config*/
Logger.log('Loading config...');
try {
  Config.loadFromFile();
}
catch (e) {
  Logger.failed(`Could not load the config: ${e.message}`);
}
/*loads the commands*/
try {
  Logger.log("Loading commands...");
  CommandManager.loadCommands();
} catch (e) {
  Logger.log(`Could not load the commands: ${e.message}`);
}
/*connects to discord*/
try {
  Logger.log("Starting discord client...");
  client.login(Config.getconfig().Token);
} catch (e) {
  Logger.failed(`Could not connect to discord: ${e.message}`)
}
/*once connected*/
client.on('ready', () => {
  client.user.setPresence('online');
  client.user.setActivity(Config.getconfig().NowPlaying);
  Logger.log(`Logged in as ${client.user.tag}`);
  Logger.log('Ready!');
  console.log();
});

/*on message event*/
client.on('message', async (message) => {
  /*if it starts with prefix loaded from config*/
  if (message.content.startsWith(Config.getconfig().Prefix)) {
    Logger.logMSG(message);
    var msg = message.content.substring(Config.getconfig().Prefix.length);
    var args = msg.split(" ");

    /*command manager checks if command exists*/
    if (CommandManager.commands[args[0]]) {
      /*sends command: message object, messaage full, message args, discord client*/
      CommandManager.commands[args[0]].functionReference(message, msg, args, client);
    } else {
      message.channel.send(`:no_entry_sign: \`The command \'${args[0]}\' does not exist\``);
    }
  }
});
