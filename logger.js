module.exports.logMSG = function (msg) {
  var t = new Date();
  var time = (pad(t.getHours(), 2) + ":" + pad(t.getMinutes(), 2) + ":" + pad(t.getSeconds(), 2))


  console.log(
    time
    + ' in '
    + msg.guild.name
    + ', '
    + msg.author.username
    + '#'
    + msg.author.discriminator
    + ' issued the command: '
    + msg.content);
}


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
