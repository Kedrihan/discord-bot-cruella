//Importing all needed Commands
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const fs = require("fs"); //this package is for reading files and getting their inputs
const colors = require("colors")
const tmi = require("tmi.js");
const ModerationPubsub = require("twitch-moderation-pubsub");
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
let options = {
  options: {
    debug: false
  },
  identity: {
    username: "crucrubot",
    password: process.env.BOT_OAUTH_TWITCH
  },
  channels: ["#cruelladk"],
  connection: {
    reconnect: true
  }
};
const twitch = new tmi.client(options)
let pubsub = null;
try {
  // Connect the client to the server..
  twitch.connect();
}
catch (e) {
  console.log(e)
}
//Twitch 
pubsub = new ModerationPubsub({
  token: process.env.BOT_OAUTH_TWITCH,
  topics: ["234453635", "62658190"],
  mod_id: "234453635"
});
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
client.hangman = {
  isLaunched: false,
  erreurs: 0,
  tirets: [],
  essais: 0,
  arrayMotAFaireDeviner: [],
  lettreDemandee: '',
  messageTabFaireDeviner: '',
  alphabet: [],
  motAFaireDeviner: "",
  embedMessage: null
};

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//login into the bot
client.login(process.env.CRUCRUBOT_TOKEN);

