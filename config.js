const fs = require("fs");

var config = {};
var servers = {};

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
    rules: [],
    adminroles: []
  }
}

module.exports.loadDefaults = function() {
  config = {
    Token: 'DISCORD_TOKEN',
    NowPlaying: 'RealLife.exe',
    Prefix: '+',
    Version: '2.0.1',
  };

  servers['SERVER ID'] = {
    name: 'SERVER NAME',
    rules: ['RULE 0', 'RULE 1'],
    adminroles: ['123456789101112', '123456789101112']
  }
};

module.exports.loadFromFile = function() {
  config = JSON.parse(fs.readFileSync('resources/config.json'));
  servers = JSON.parse(fs.readFileSync('resources/servers.json'));
}

module.exports.writeToFile = function() {
  fs.writeFileSync('resources/config.json', JSON.stringify(config, null, 4));
  fs.writeFileSync('resources/servers.json', JSON.stringify(servers, null, 4));
}
