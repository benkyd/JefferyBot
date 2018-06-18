const Discord = require('discord.js');
const fs = require('fs');
const PImage = require('pureimage');
const Config = require('../config.js');
const Helper = require('../helper.js');

/*message object, messaage full, message args, discord client*/

/*rule commands*/
module.exports.rules = function(message, msg, args, discordclient) {
  let serverName = message.guild.name;
  let serverID = message.guild.id;
  let serversConfig = Config.getservers();
  let Rules = serversConfig[serverID].rules;

  let em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle(serverName + '\'s Server Rules');

  for (let i = 1; i < Rules.length; i++) {
    em.addField(`Rule ${i}:`, Rules[i]);
  }

  message.channel.send(em);
}

module.exports.rule = function(message, msg, args, discordclient) {
  let serverName = message.guild.name;
  let serverID = message.guild.id;
  let serversConfig = Config.getservers();
  let Rules = serversConfig[serverID].rules;

  try {
    let rule = Rules[args[1]];
    message.channel.send(`Rule ${args[1]}: ${rule}`);
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
  }
}

module.exports.addrule = function(message, msg, args, discordclient) {
  let serverName = message.guild.name;
  let serverID = message.guild.id;
  let serversConfig = Config.getservers();
  let Rules = serversConfig[serverID].rules;

  let newRule = args[1] + ' ';
  for (let i = 2; i < args.length; i++) {
    newRule += args[i] + ' ';
  }

  try {
    Rules.push(newRule);
    serversConfig[serverID].rules = Rules;
    Config.writeToFile();
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`Somthing went wrong\``);
    return;
  }

  let em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully added!');
  em.addField(`Rule ${Rules.length - 1}:`, newRule);
  message.channel.send(em);
}

module.exports.delrule = function(message, msg, args, discordclient) {
  if (args[1]) {
    let serverName = message.guild.name;
    let serverID = message.guild.id;
    let serversConfig = Config.getservers();
    let Rules = serversConfig[serverID].rules;
    let toDelete = args[1];
  
    try {
      Rules.splice(toDelete, 1);
      serversConfig[serverID].rules = Rules;
      Config.writeToFile();
    } catch (e) {
      message.channel.send(`:no_entry_sign: \`That is not a valid rule\``)
      return;
    }
  
    let em = new Discord.RichEmbed();
    em.setColor('BLUE');
    em.setTitle('Rule successfully deleted!');
    em.addField(`Rule ${toDelete} deleted`, 'All subsiquent rules pushed one space to the left');
    message.channel.send(em);
  } else {
    message.channel.send(`:no_entry_sign: \`You did not specify what to delete\``);
  }
}

module.exports.editrule = function(message, msg, args, discordclient) {
  let serverName = message.guild.name;
  let serverID = message.guild.id;
  let serversConfig = Config.getservers();
  let Rules = serversConfig[serverID].rules;

  let newRule = args[2] + ' ';
  for (let i = 3; i < args.length; i++) {
    newRule += args[i] + ' ';
  }

  try {
    Rules[args[1]] = newRule;
    serversConfig[serverID].rules = Rules;
    Config.writeToFile();
  } catch (e) {
    message.channel.send(`:no_entry_sign: \`That is not a valid rule\``);
    return;
  }
  let em = new Discord.RichEmbed();
  em.setColor('BLUE');
  em.setTitle('Rule successfully edited!');
  em.addField(`Rule ${args[1]}:`, newRule);
  message.channel.send(em);
}

/*birthday commands*/
module.exports.addbirthday = function(message, msg, args, discordclient) {
  //input date is [DD/MM/YYYY] such that 14/05/2002
  let birthdays = Config.getservers()[message.guild.id].birthdays;



  Config.getservers()[message.guild.id].birthdays = birthdays;
  Config.writeToFile();
}

module.exports.delbirthday = function(message, msg, args, discordclient) {
  let birthdays = Config.getservers()[message.guild.id].birthdays;



  Config.getservers()[message.guild.id].birthdays = birthdays;
  Config.writeToFile();
}

module.exports.nextbirthday = function(message, msg, args, discordclient) {
  let birthdays = Config.getservers()[message.guild.id].birthdays;
}

module.exports.allbirthdays = function(message, msg, args, discordclient) {
  let birthdays = Config.getservers()[message.guild.id].birthdays;
}

/*poll commands*/
let polls = {};

module.exports.poll = async function(message, msg, args, discordclient) {
  if (args[1] == 'start') {
    if (args[2]) {
      if (!polls[message.guild.id]) {
        await startPoll(message, args);
        let options = '';
        for (i in polls[message.guild.id].options) {
          options += polls[message.guild.id].options[i] + ', ';
        }
        options = options.substring(0, options.length - 2);

        let em = new Discord.RichEmbed();
        em.setAuthor('Poll started!');
        em.setColor('BLUE');
        em.setTitle(polls[message.guild.id].pollq);
        em.addField('With the options:', options)
        em.setFooter('Type \'vote [option]\' to vote for that option');
        message.channel.send(em);
        return;
      } else {
        message.channel.send(':no_entry_sign: \`There is allready a poll running, you can type \'poll stop\' to stop it and find its results\`');
        return;
      }
    } else {
      message.channel.send(':no_entry_sign: \`No options given, try \'help poll\' for usage\`');
      return;
    }
  } else if (args[1] == 'stop') {
    if (polls[message.guild.id]) {

      let results = polls[message.guild.id].votes
          .map((x, i) =>
              {
                  return {
                      count: x,
                      value: polls[message.guild.id].options[i]
                  };
               }
          )
          .sort((a, b) => b.count - a.count)
          .filter((x, i, arr) => x.count == arr[0].count)
          //.map(x => x.value)

      let winners = '';
      let votesForWinners = '';

      for (let i = 0; i < results.length; i++) {
          winners += results[i].value + ' and ';
          votesForWinners = results[i].count;
      }
      winners = winners.substring(0, winners.length - 5);

      let em = new Discord.RichEmbed();
      em.setAuthor('Poll Results');
      em.setColor('BLUE');
      em.setTitle(polls[message.guild.id].pollq)
      em.addField(winners + ' wins!', 'with ' + votesForWinners + ' vote(s)');
      message.channel.send(em);
      delete polls[message.guild.id];
      return;

    } else {
      message.channel.send(':no_entry_sign: \`There are no polls running, you can type \'poll start\' to start a new poll\`');
      return;
    }
  } else if (args[1] == 'view') {
    if (polls[message.guild.id]) {
      let poll = polls[message.guild.id];
      let q = poll.pollq;
      let options = poll.options;
      let votes = poll.votes;

      let firstline = '';
      let secondline = ' ';
      for(let i = 0; i < options.length; i++) {
        firstline += options[i] + ', ';

        let length = options[i].length + 2;
        let padding = length - 1;

        for(let j = 0; j < padding; j++) {
          secondline += ' ';
        }
        secondline += votes[i];
        for(let j = 0; j < padding; j++) {
          secondline += ' ';
        }
      }
      firstline = firstline.substring(0, firstline.length - 2);
      
      let em = new Discord.RichEmbed();
      em.setAuthor(`For the question \'${q}\'`);
      em.setTitle('With the options and votes:');
      em.setColor('BLUE');
      em.addField(firstline, secondline);
      message.channel.send(em);
    } else {
      message.channel.send(':no_entry_sign: \`There are no polls running, you can type \'poll start\' to start a new poll\`');
    }
  } else {
    message.channel.send(':no_entry_sign: \`Incorrect arguments given, try \'help poll\' for usage\`');
    return;
  }
}

module.exports.vote = function(message, msg, args, discordclient) {
  if (polls[message.guild.id]) {
    let poll = polls[message.guild.id];
    let hasVoted = false;
    for (let i = 0; i < poll.voted.length; i++) {
      if (poll.voted[i] == message.author.id) {
        hasVoted = true;
      }
    }
    if (!hasVoted) {
      let option = args.slice(1).join(" ");
      let index;

      for (let i = 0; i < poll.options.length; i++) {
        if (poll.options[i] == option) {
          index = i
          poll.votes[i]++;
          break;
        }
      }

      if (index == undefined) {
        message.channel.send(':no_entry_sign: \`That is not an option!\`');
        return;
      }

      poll.voted.push(message.author.id);
      polls[message.guild.id] = poll;

      message.channel.send(`${message.author} voted for ${option}!`);
    } else {
      message.channel.send(':no_entry_sign: \`You have already voted\`');
    }
  } else {
    message.channel.send(':no_entry_sign: \`There are no polls running at the moment, use \'poll start\' to start one\`');
  }
}

async function startPoll(messageObj, args) {
  let parsedOptions = args.slice(2).join(" ").split("--");
  let pollquestion = parsedOptions[0];

  for(let i = 0; i < parsedOptions.length; i++) {
    parsedOptions[i]= parsedOptions[i].trim();
  }
  
  parsedOptions.splice(0, 1);
  let parsedVotes = await getStartingVotes(parsedOptions)
  polls[messageObj.guild.id] = {
    pollq: pollquestion,
    options: parsedOptions,
    votes: parsedVotes,
    voted: []
  }
}

async function getStartingVotes(options) {
  let votes = [];
  for (i in options) {
    votes.push('0');
  }
  return votes;
}

/*chess commands*/
let chess = {};

module.exports.startGame = async function(message, msg, args, discordclient) {
  if (!chess[message.guild.id]) {
    if (args[1]) {
      try {
        let player1;

        try {
          player1 = message.mentions.members.first();
        } catch (e) {
          message.channel.send(':no_entry_sign: \`You have not mentioned a user to play with...\`')      
          return;
        }
        if (player1.id == message.author.id) {
          message.channel.send(':no_entry_sign: \`You cannot play with yourself :(\`')      
          return;
        }
        if (player1.id == discordclient.user.id) {
          message.channel.send(':no_entry_sign: \`You cannot play with me :(\`')      
          return;
        }

        await initBoard(message, message.author, player1);
        let board = await drawcurrentstate(message);

        

        let em = new Discord.RichEmbed();

        em.addField()
        //em.setImage(board);

        message.channel.send(em);

      } catch (e) {
        console.log(e);
        message.channel.send(':no_entry_sign: \`You have not mentioned a user to play with...\`')      
      }  
    } else {
      message.channel.send(':no_entry_sign: \`You have not mentioned a user to play with\`')      
    }
  } else {
    message.channel.send(':no_entry_sign: \`There is allready a game in progress.\`');
  }
}

module.exports.move = async function(message, msg, args, discordclient) {

}


//game logic


async function initBoard(message, p1, p2, channelID) {
  chess[message.guild.id] = {
    channel: {
      id: channelID
    },
    board: await initMatrix(8, 8, '－'),
    prevMoves: [],
    winner: 0,
    players: [
      {
        playerName: p1.name,
        playerID: p1.id,
        score: 0,
        takenPeices: {
          queen: 0,
          rook: 0,
          bishop: 0,
          knight: 0,
          pawn: 0
        }
      },
      {
        playerName: p2.name,
        playerID: p1.id,
        score: 0,
        takenPeices: {
          queen: 0,
          rook: 0,
          bishop: 0,
          knight: 0,
          pawn: 0  
        }
      }
    ]
  }
}

async function initMatrix(width, height, defValue) {
  //array is layed out such that arr[y][x] = x, y
  let matrix = [];
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    if (defValue) {
      for (let j = 0; j < width; j++) {
        matrix[i][j] = defValue;
      }
    }
  }
  matrix[0][0] = '♖';
  matrix[0][1] = '♘';
  matrix[0][2] = '♗';
  matrix[0][3] = '♕';
  matrix[0][4] = '♔';
  matrix[0][5] = '♗';
  matrix[0][6] = '♘';
  matrix[0][7] = '♖';
                     
  matrix[1][0] = '♙';
  matrix[1][1] = '♙';
  matrix[1][2] = '♙';
  matrix[1][3] = '♙';
  matrix[1][4] = '♙';
  matrix[1][5] = '♙';
  matrix[1][6] = '♙';
  matrix[1][7] = '♙';
      
  matrix[7][0] = '♜';
  matrix[7][1] = '♞';
  matrix[7][2] = '♝';
  matrix[7][3] = '♚';
  matrix[7][4] = '♛';
  matrix[7][5] = '♝';
  matrix[7][6] = '♞';
  matrix[7][7] = '♜';
      
  matrix[6][0] = '♟';
  matrix[6][1] = '♟';
  matrix[6][2] = '♟';
  matrix[6][3] = '♟';
  matrix[6][4] = '♟';
  matrix[6][5] = '♟';
  matrix[6][6] = '♟';
  matrix[6][7] = '♟';
  return matrix;
}

async function drawcurrentstate(message) {
  let c = chess[message.guild.id].board;
  let board = '';

  board += `┌─－─┬─－─┬─－─┬─－─┬─－─┬─－─┬─－─┬─－─┬─－─┐\n`;
  board += `│ － │ １ │ ２ │ ３ │ ４ │ ５ │ ６ │ ７ │ ８ │\n`;
  board += `├─－─╆━－━┿━－━┿━－━┿━－━┿━－━┿━－━┿━－━┿━－━┥\n`;
  board += `| Ａ ┃ ${c[0][0]} │ ${c[0][1]} │ ${c[0][2]} │ ${c[0][3]} │ ${c[0][4]} │ ${c[0][5]} │ ${c[0][6]} │ ${c[0][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｂ ┃ ${c[1][0]} │ ${c[1][1]} │ ${c[1][2]} │ ${c[1][3]} │ ${c[1][4]} │ ${c[1][5]} │ ${c[1][6]} │ ${c[1][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｃ ┃ ${c[2][0]} │ ${c[2][1]} │ ${c[2][2]} │ ${c[2][3]} │ ${c[2][4]} │ ${c[2][5]} │ ${c[2][6]} │ ${c[2][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｄ ┃ ${c[3][0]} │ ${c[3][1]} │ ${c[3][2]} │ ${c[3][3]} │ ${c[3][4]} │ ${c[3][5]} │ ${c[3][6]} │ ${c[3][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｅ ┃ ${c[4][0]} │ ${c[4][1]} │ ${c[4][2]} │ ${c[4][3]} │ ${c[4][4]} │ ${c[4][5]} │ ${c[4][6]} │ ${c[4][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｆ ┃ ${c[5][0]} │ ${c[5][1]} │ ${c[5][2]} │ ${c[5][3]} │ ${c[5][4]} │ ${c[5][5]} │ ${c[5][6]} │ ${c[5][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｇ ┃ ${c[6][0]} │ ${c[6][1]} │ ${c[6][2]} │ ${c[6][3]} │ ${c[6][4]} │ ${c[6][5]} │ ${c[6][6]} │ ${c[6][7]} |\n`;
  board += `├─－─╂─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┼─－─┤\n`;
  board += `| Ｈ ┃ ${c[7][0]} │ ${c[7][1]} │ ${c[7][2]} │ ${c[7][3]} │ ${c[7][4]} │ ${c[7][5]} │ ${c[7][6]} │ ${c[7][7]} |\n`;
  board += `└─－─┸─－─┴─－─┴─－─┴─－─┴─－─┴─－─┴─－─┴─－─┘\n`;

  return board;
}

function setupGame(guild) {

}

function disbandGame(guild) {

}