const Discord = require('discord.js');
const ping = require('ping');
const fs = require('fs');
const Config = require('../config.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.nextlaunch = async function(message, msg, args, discordclient) {
    var url = 'https://launchlibrary.net/1.4/launch/next/1';
    try {
        var result = await Helper.requestPromise(url);
        var json = JSON.parse(result).launches;

        var em = new Discord.RichEmbed();
        em.setTitle(json.name);

        message.channel.send(em);
    } catch (e) {
        console.log(e);
        message.channel.send(`:no_entry_sign: \`There was a problem with the API...\``);
    }
}
