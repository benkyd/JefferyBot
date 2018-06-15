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
        var launch = JSON.parse(result).launches[0];

        var em = new Discord.RichEmbed();
        em.setTitle(launch.name);
        em.setColor('BLUE');
        em.setAuthor('Next Launch Info:', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png', 'https://spaceflightnow.com/launch-schedule/');
        em.setThumbnail('https://www.nasa.gov/sites/default/files/saturnv-3_0.jpg');
        em.url = launch.location.pads[0].mapURL;


        var status = 'Unknown';
        if (launch.status == 1) {
            status = 'Green For Launch';
        } else if (launch.status == 2) {
            staus = 'RED For Launch';
        } else if (launch.status == 3) {
            status = 'Mission Success';
        } else if (launch.status == 4) {
            status = 'Mission Failed';
        }
        em.addField('Mission Status:', status);

        em.addField('Launch Window Start', launch.windowstart + '   ', true);
        em.addField('Launch Window End', launch.windowend, true);

        if (launch.probability != -1) {
            em.addField('Probability of launch:', launch.probability, true);
        } else {
            em.addField('Probability of launch:', 'Unknown at this time...', true);
        }
        em.addField('Last Updated At:', launch.changed, true)

        em.addBlankField();

        var rocket = launch.rocket;
        var agencies = rocket.agencies[0];

        em.addField('Rocket Name:', rocket.name, true);
        em.addField('Launch Agency:', agencies.name, true);
        em.addField(`More information about ${agencies.name}`, agencies.wikiURL);

        em.addBlankField();

        var location = launch.location;
        var pad = location.pads[0];

        em.addField('Launch Pad:', pad.name);
        em.addField('Loacation Name:', location.name, true);
        em.addField('Country:', location.countryCode, true);

        em.addBlankField();

        var mission = launch.missions[0];
        var missionagency = mission.agencies[0];
        var payload = mission.payloads[0];

        em.addField('Mission Name:', mission.name, true);
        em.addField('Mission Type:', mission.typeName, true);

        em.addField('Agency Name:', missionagency.name, true);
        em.addField('Agency Region:', missionagency.countryCode, true);



        em.addField('Mission Description:', mission.description)

        message.channel.send(em);
    } catch (e) {
        console.log(e);
        message.channel.send(`:no_entry_sign: \`There was a problem with the API...\``);
    }
}
