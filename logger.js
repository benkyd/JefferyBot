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
  );
}

module.exports.log = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
  );
}

module.exports.success = function() {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
  );
}

module.exports.failed = function(msg) {
  var time = getTime();
  console.log(
    '[' + time + '] '
    + msg
  );
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getTime() {
  var t = new Date();
  var time = (pad(t.getHours(), 2) + ":" + pad(t.getMinutes(), 2) + ":" + pad(t.getSeconds(), 2))
  return time;
}
