const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { getRandomInt } = require("../../handlers/functions");
module.exports = {
  name: "duel",
  category: "Duel",
  aliases: ["jusdepomme"],
  allowedChannels: ["591275428354719764"],
  usage: "duel <TARGET>",
  description: "Provoque en duel TARGET",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    const winPhrases = [
      "{X} a pulvérisé {Y} avec son attaque spéciale pikpik. C’est super efficace !",
      "{X} a fait voir flou à {Y}",
      "{Y} a goûté les phalanges de {X}",
      "{X} domine {Y} 6-2 6-1 6-3, jeu, set et match.",
      "Un 3-0 sec pour {X} contre {Y}",
      "{X} a collé la calotte de ses morts à {Y}",
      "{X} a pourfendu {Y}",
      "{X} a envoyé {Y} six pieds sous terre",
      "{X} a refait les chicots de {Y}",
      "{X} a démembré {Y} avec grande classe",
      "{X} a vaporisé {Y}. Il n'en reste rien. ",
      "{X} a envoyé par le fond {Y}",
      "{Y} s'est fait démolir la tronche par {X}",
      "{X} a éclaté {Y}. Il/elle est devenu méconnaissable.",
      "{Y} s'est fait atomiser par {X}. Ça ne doit pas être bien agréable !",
      "{X} a collé une branlée mémorable à {Y} ! Je n'aimerai pas être à sa place."
    ]
    try {
      if (!args[0] || !args[0].match(/[\\<>@!\d]/g)) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERREUR`)
          .setDescription("Tu n'as pas défini de cible.")
        );
      }
      if (message.content.includes(client.user.id)) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERREUR`)
          .setDescription("Ne cherche pas à me défier, je te défonce dans tous les cas (et arrête de me tag stp " + client.emojis.cache.find(emoji => emoji.name === "FeelsBaguetteMan").toString() + ")")
        );
      }
      let target = args[0]
      if (target.replace(/[\\<>@!]/g, "") === message.author.id) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERREUR`)
          .setDescription("Un peu de bon sens " + message.author.toString() + " ! Tu ne peux pas te combattre toi-même !")
        );
      }
      let valueForAuthor = getRandomInt(100)
      let phrase = winPhrases[getRandomInt(winPhrases.length - 1)]
      if (valueForAuthor >= 50) {
        phrase = phrase.replace("{X}", message.author.toString());
        phrase = phrase.replace("{Y}", target);
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wincolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`:white_check_mark: VICTOIRE`)
          .setDescription(phrase)
        );
      }
      else {
        phrase = phrase.replace("{Y}", message.author.toString());
        phrase = phrase.replace("{X}", target);
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ DEFAITE`)
          .setDescription(phrase)
        );
      }


    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERREUR | Une erreur est survenue.`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}
