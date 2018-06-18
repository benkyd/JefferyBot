const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const Config = require('../config.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

module.exports.nextlaunch = async function(message, msg, args, discordclient) {
  let url = 'https://launchlibrary.net/1.4/launch/next/1';
  try {
    try {
      let launch = JSON.parse(result).launches[0];
  
      let em = new Discord.RichEmbed();
      em.setTitle(launch.name);
      em.setColor('BLUE');
      em.setAuthor('Next Launch Info:', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png', 'https://spaceflightnow.com/launch-schedule/');
      em.setThumbnail('https://www.nasa.gov/sites/default/files/saturnv-3_0.jpg');
      em.url = launch.location.pads[0].mapURL;
    } catch (e) {
      message.channel.send(`:no_entry_sign: \`There was a problem with the API...\``);
      return;
    }
    let result = await Helper.requestPromise(url);

    let status = 'Unknown';
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
      em.addField('Probability of launch:', launch.probability + '%', true);
    } else {
      em.addField('Probability of launch:', 'Unknown at this time...', true);
    }
    em.addField('Last Updated At:', launch.changed, true)

    em.addBlankField();

    let rocket = launch.rocket;
    let agencies = rocket.agencies[0];

    em.addField('Rocket Name:', rocket.name, true);
    em.addField('Launch Agency:', agencies.name, true);
    em.addField(`More information about ${agencies.name}`, agencies.wikiURL);

    em.addBlankField();

    let location = launch.location;
    let pad = location.pads[0];

    em.addField('Launch Pad:', pad.name);
    em.addField('Loacation Name:', location.name, true);
    em.addField('Country:', location.countryCode, true);

    em.addBlankField();

    let mission = launch.missions[0];
    let missionagency = mission.agencies[0];
    let payload = mission.payloads[0];

    em.addField('Mission Name:', mission.name, true);
    em.addField('Mission Type:', mission.typeName, true);

    em.addField('Agency Name:', missionagency.name, true);
    em.addField('Agency Region:', missionagency.countryCode, true);

    em.addField('Mission Description:', mission.description)

    message.channel.send(em);

  } catch (e) {
    message.channel.send(`:no_entry_sign: \`There was a problem with the API...\``);
  }
}

module.exports.spaceimg = async function(message, msg, args, discordclient) {
  if (args.length >= 2) {
    let position = args[1].split(";");
    if (position.length === 2) {
      https.get(`https://api.nasa.gov/planetary/earth/imagery/?lon=${position[1]}&lat=${position[0]}&api_key=${Config.getconfig().NASA_APIKey}`, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });
        resp.on("end", () => {
          let image = JSON.parse(data);
            if (image.url) {
            let em = new Discord.RichEmbed();
            em.setColor("BLUE");
            em.setTitle("Satellite picture");
            em.setURL(image.url);
            em.setFooter(`Long: ${position[1]}, Lat: ${position[0]}, Date: ${image.date}`);
            em.setImage(image.url);
            message.channel.send(em);
          } else {
            message.channel.send(":no_entry_sign: `Invalid coordonates :/`");
          }
       });
       }).on("error", (err) => {
          message.channel.send(":no_entry_sign: `Nasa API service not available :/`");
       });
      } else {
        message.channel.send(":no_entry_sign: `Invalid longitude and latitude. Use this format: lat;long`");
      }
   } else {
      message.channel.send(":no_entry_sign: `Please supply a longitude and a latitude in this format: lat;long`");
  }
}

module.exports.pictureoftheday = function(message, msg, args, discordclient) {
  let apiKey = Config.getconfig().NASA_APIKey;
  let url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
}

module.exports.nearearthobj = function(message, msg, args, discordclient) {
  let apiKey = Config.getconfig().NASA_APIKey;
  let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY';
}
