const fs = require("fs");

var config = null;


module.exports.getconfig = function() {
    return config;
};

module.exports.setconfig = function(con) {
    config = con;
};

module.exports.loadDefaults = function() {
  config = {
    Token: "DISCORD_TOKEN",
    NowPlaying: "RealLife.exe",
    Prefix: "+",
    Version: "2.0.1",

    Rules: ["Rule 0", "Rule 1"]
  };
};

module.exports.loadFromFile = function() {
  config = JSON.parse(fs.readFileSync("resources/config.json"));
}

module.exports.writeToFile = function() {
  fs.writeFileSync("resources/config.json", JSON.stringify(config, null, 4));
}
