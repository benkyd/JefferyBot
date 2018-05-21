const Discord = require('discord.js');
const http = require('http');
const ping = require('ping');
const fs = require('fs');
const colors = require('colors');
const Logger = require('./logger');
const Config = require('./config');
const Commands = require('./commands/commands')
const CommandManager = require('./commandmanager');
const Helper = require('./helper')

const client = new Discord.Client({autoReconnect:true});
Logger.welcome();


/*checks if config exists*/
if (!fs.existsSync('resources/config.json') || !fs.existsSync('resources/servers.json')) {
    Logger.log('Creating the config...');
    try {
        if (!fs.existsSync('resources/')) {
            fs.mkdirSync('resources/');
        }
        Config.loadDefaults();
        /*gets all current servers info*/
        Config.writeToFile();
    }
    catch (e) {
        Logger.warn(`Could not create the config: ${e.message}`);
    }
}
/*loads config*/
try {
  Logger.log('Loading config...');
  Config.loadFromFile();
  Logger.success('Congig loaded');
}
catch (e) {
  Logger.warn(`Could not load the config: ${e.message}`);
}
/*loads the commands*/
try {
  Logger.log('Loading commands...');
  CommandManager.loadCommands();
  Logger.success('Commands loaded');
} catch (e) {
  Logger.warn;(`Could not load the commands: ${e.message}`);
}
/*connects to discord*/
try {
  Logger.log('Starting discord client...');
  client.login(Config.getconfig().Token);
} catch (e) {
  Logger.failed(`Could not connect to discord: ${e.message}`)
}

/*once connected*/
client.on('ready', () => {
  try {
    Logger.success('Connected to discords API');


    /*adds all servers not in config to config*/
    Logger.log('Setting up the server spesific commands...')
    client.guilds.array().forEach((g) => {
      if (!Config.getservers()[g.id]) {
        Config.addServer(g);
      }
    });
    Config.writeToFile();
    Logger.success('Server commands set up');


    Logger.log('Logging in...')
    client.user.setPresence('online');
    client.user.setActivity(Config.getconfig().NowPlaying);
    Logger.success(`Logged in as ${client.user.tag}`);
    Logger.log('Ready!');
    console.log();
  } catch (e) {
    Logger.failed(`Somthing went wrong with discords API: ${e.message}`)
  }
});



/*on message event*/
client.on('message', async (message) => {
  /*if it starts with prefix loaded from config*/
  if (message.content.startsWith(Config.getconfig().Prefix)) {
    Logger.logMSG(message);
    var msg = message.content.toLowerCase().substring(Config.getconfig().Prefix.length);
    var args = message.content.substring(Config.getconfig().Prefix.length).split(' ');
    args[0] = args[0].toLowerCase();

    /*command manager checks if command exists*/
    if (CommandManager.commands[args[0]]) {
      /*sends command: message object, messaage full, message args, discord client*/
      CommandManager.commands[args[0]].functionReference(message, msg, args, client);
    } else {
      message.channel.send(`:no_entry_sign: \`The command \'${args[0]}\' does not exist\``);
    }
  }
});

/*on join server event*/
client.on('guildCreate', async (guild) => {
  Logger.log(`JefferyBot was invited to the \'${guild.name}\' server!`);
  try {
    Logger.log(`Setting up the config for \'${guild.name}\'`)
    Config.addServer(guild);
    Config.writeToFile();
    Logger.success(`Set up the config for the \'${guild.name}\' server`)
  } catch (e) {
    Logger.failed('Could not set up the server config');
  }
});

/*on leave server event*/
client.on('guildDelete', async (guild) => {
  Logger.log(`JefferyBot left the \'${guild.name}\' server!`);
});

client.on("disconnected", function () {
  Logger.failed('Disconnected...')
  process.exit(1);
});

client.on('error', async (error) => {
});
