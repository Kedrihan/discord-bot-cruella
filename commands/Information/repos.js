const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "repos",
  category: "Information",
  aliases: [],
  allowedChannels: ["all"],
  usage: "repos",
  description: "Retourne une phrase sympatoche",
  run: async (client, message, args, user, text, prefix) => {
    try {
      return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setDescription("Prends ta journée ! " + client.emojis.cache.find(emoji => emoji.name === "Babyrage").toString() )
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
