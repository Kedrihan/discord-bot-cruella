const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "alcool",
  category: "Information",
  aliases: ["jusdepomme"],
  allowedChannels: ["all"],
  usage: "alcool",
  description: "Retourne une phrase sympatoche",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    try {
      return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(client.emojis.cache.find(emoji => emoji.name === "VoHiYo").toString() + " <http://www.alcool-info-service.fr/> ")
      );

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

