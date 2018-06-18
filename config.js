const fs = require('fs');

let config = {};
let servers = {};

module.exports.getconfig = function() {
    return config;
};

module.exports.setconfig = function(con) {
    config = con;
};

module.exports.getservers = function() {
    return servers;
};

module.exports.setservers = function(con) {
    servers = con;
};

module.exports.addServer = function(guild) {
  servers[guild.id] = {
    name: guild.name,
    rules: ["Oh yeah, arrays start at 0"],
    birthdays: [],
    prefix: '+',
    adminroles: []
  }
}

module.exports.loadDefaults = function() {
  config = {
    Token: '[DISCORD TOKEN HERE]',
    NASA_APIKey: '[NASA API KEY HERE]',
    InviteLink: '[BOT INVITE LINK HERE]',
    AdminLink: '[ADMIN INVITE LINK HERE]',
    OwnerID: '[YOUR ID HERE]',
    NowPlaying: 'RealLife.exe',
    Version: '2.0.1',
  };

  servers['SERVER ID'] = {
    name: 'SERVER NAME',
    rules: ['RULE 0', 'RULE 1'],
    birthdays: [],
    prefix: '+',
    adminroles: ['123456789101112', '123456789101112']
  };
}

module.exports.loadFromFile = function() {
  config = JSON.parse(fs.readFileSync('resources/config.json'));
  servers = JSON.parse(fs.readFileSync('resources/servers.json'));
}

module.exports.writeToFile = function() {
  fs.writeFileSync('resources/config.json', JSON.stringify(config, null, 4));
  fs.writeFileSync('resources/servers.json', JSON.stringify(servers, null, 4));
}
