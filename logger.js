const colors = require('colors');

colors.setTheme({
  brace: 'white',
  input: 'grey',
  prompt: 'cyan',
  info: 'green',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

module.exports.logMSG = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + 'In '
    + msg.guild.name
    + ', '
    + msg.author.username
    + '#'
    + msg.author.discriminator
    + ' issued the command: '
    + msg.content
    .input
  );
}

module.exports.logJOIN = function() {

}

module.exports.log = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
    .prompt
  );
}

module.exports.success = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
    + ' ['.brace
    + 'SUCCESS' .info
    + ']'.brace
  );
}

module.exports.failed = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
    + ' ['.brace
    + 'FAILED' .error
    + ']'.brace
  );
}

module.exports.warn = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
    + ' ['.brace
    + 'WARN' .warn
    + ']'.brace
  );
}

module.exports.welcome = function() {
  console.log(`
           _       __  __                ____        _
          | |     / _|/ _|              |  _ \\      | |
          | | ___| |_| |_ ___ _ __ _   _| |_) | ___ | |_
      _   | |/ _ \\  _|  _/ _ \\ '__| | | |  _ < / _ \\| __|
     | |__| |  __/ | | ||  __/ |  | |_| | |_) | (_) | |_
      \\____/ \\___|_| |_| \\___|_|   \\__, |____/ \\___/ \\__|
                                    __/ |
                                   |___/
    `.rainbow);
    console.log('Invite JefferyBot to your server!  '
    + 'https://discordapp.com/api/oauth2/authorize?client_id=423592273151000576&permissions=506981494&scope=bot' .debug);
    console.log();
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getTime() {
  var t = new Date();
  var time = (pad(t.getHours(), 2) + ':' + pad(t.getMinutes(), 2) + ':' + pad(t.getSeconds(), 2))
  return time;
}
