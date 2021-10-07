const randomWordFR = require('random-word-fr');
const { MessageEmbed } = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
module.exports = {
  //get a member lol
  getMember: function (message, toFind = "") {
    try {
      toFind = toFind.toLowerCase();
      let target = message.guild.members.get(toFind);
      if (!target && message.mentions.members) target = message.mentions.members.first();
      if (!target && toFind) {
        target = message.guild.members.find((member) => {
          return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
        });
      }
      if (!target) target = message.member;
      return target;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //changeging the duration from ms to a date
  duration: function (ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (60 * 1000)) % 60).toString();
    const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
    const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
    return `\`${days} jours\`,\`${hrs} heures\`,\`${min} minutes\`,\`${sec} secondes\``;
  },
  //function for awaiting reactions
  promptMessage: async function (message, author, time, validReactions) {
    try {
      time *= 1000;
      for (const reaction of validReactions) await message.react(reaction);
      const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
      return message.awaitReactions(filter, {
        max: 1,
        time: time
      }).then((collected) => collected.first() && collected.first().emoji.name);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //Function to wait some time
  delay: function (delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //randomnumber between 0 and x
  getRandomInt: function (max) {
    try {
      return Math.floor(Math.random() * Math.floor(max));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //random number between y and x
  getRandomNum: function (min, max) {
    try {
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  //function for creating a bar
  createBar: function (maxtime, currenttime, size = 25, line = "▬", slider = "🔶") {
    try {
      let bar = currenttime > maxtime ? [line.repeat(size / 2 * 2), (currenttime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (currenttime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (currenttime / maxtime)) + 1), currenttime / maxtime];
      if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
      return `**[${bar[0]}]**\n**${new Date(currenttime).toISOString().substr(11, 8) + " / " + (maxtime == 0 ? " ◉ LIVE" : new Date(maxtime).toISOString().substr(11, 8))}**`;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  format: function (millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  escapeRegex: function (str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  arrayMove: function (array, from, to) {
    try {
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  },
  displayHangman: function (failures) {
    let hang = ""
    switch (failures) {
      case 0:
        hang = "``` \n      \n \n \n \n```";
        break;
      case 1:
        hang = "``` \n      \n \n \n \n━┻━```";
        break;
      case 2:
        hang = "``` \n ┃     \n ┃\n ┃\n ┃\n━┻━```";
        break;
      case 3:
        hang = "``` ┏━━━━━┯\n ┃     \n ┃\n ┃\n ┃\n━┻━```";
        break;
      case 4:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃\n ┃\n ┃\n━┻━```";
        break;
      case 5:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃     O\n ┃\n ┃\n━┻━```"
        break;
      case 6:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃     O\n ┃     X\n ┃\n━┻━```";
        break;
      case 7:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃    \\O\n ┃     X\n ┃\n━┻━```";
        break;
      case 8:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃    \\O/\n ┃     X\n ┃\n━┻━```";
        break;
      case 9:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃    \\O/\n ┃     X\n ┃    /\n━┻━```";
        break;
      case 10:
        hang = "``` ┏━━━━━┯\n ┃     │\n ┃    \\O/\n ┃     X\n ┃    / \\\n━┻━```";
        break;
    }
    return hang;
  },
  getRandomWordHangman: async function () {
    let randomWord = await randomWordFR();
    let regex = new RegExp(/[ÀÁÂàÄÅàáâàäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ\s]+/g)
    while (randomWord.length < 4 || randomWord.match(regex)) {
      randomWord = await randomWordFR();
    }
    return randomWord;
  },
  initHangman: async function (hangmanParams) {
    hangmanParams.isLaunched = true;
    hangmanParams.motAFaireDeviner = await module.exports.getRandomWordHangman();
    hangmanParams.alphabet = [];
    hangmanParams.erreurs = 0;
    hangmanParams.tiretsLength = 0;
    hangmanParams.arrayMotAFaireDeviner = [];
    hangmanParams.tirets = [];
    hangmanParams.essais = 0;

    for (let letter of hangmanParams.motAFaireDeviner) {
      if (letter !== "-") {
        hangmanParams.tirets.push("_");
        hangmanParams.tiretsLength++;
      } else {
        hangmanParams.tirets.push(letter);

      }
      hangmanParams.arrayMotAFaireDeviner.push(letter.toUpperCase());
    }
    if (hangmanParams.arrayMotAFaireDeviner.length === hangmanParams.motAFaireDeviner.length) {
      let messageInitOk1 = "Le mot est choisi ! Pour demander une lettre, merci de rentrer la commande " + config.prefix + "devine LETTRE où LETTRE est à remplacer par celle que vous voulez faire deviner, et si vous avez une idée du mot complet, faites " + config.prefix + "devine MOT (et il y a " + config.defaultCommandCooldown + " secondes de délai entre 2 commandes)";
      hangmanParams.messageTabFaireDeviner = hangmanParams.tirets.toString().replace(new RegExp(",", "g"), ' ');
      module.exports.reloadEmbedHangman(hangmanParams)
      return Promise.resolve(messageInitOk1)

    }

  },
  reloadEmbedHangman: function (hangmanParams) {
    hangmanParams.embedMessage = new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("`> " + hangmanParams.messageTabFaireDeviner + " <`")
      .setDescription(module.exports.displayHangman(hangmanParams.erreurs))
      .addFields(
        {
          name: "Erreurs",
          value: hangmanParams.erreurs + "/10",
          inline: true
        },
        {
          name: "Essais",
          value: hangmanParams.essais,
          inline: true
        },
        {
          name: "Lettres",
          value: hangmanParams.alphabet.length > 0 ? hangmanParams.alphabet.toString().toUpperCase() : "//",
          inline: true
        });
  }
}