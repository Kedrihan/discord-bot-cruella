const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "commu",
  category: "Information",
  aliases: [],
  allowedChannels: ["all"],
  usage: "commu",
  description: "Retourne une phrase sympatoche",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    try {
      return message.channel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setDescription(client.emojis.cache.find(emoji => emoji.name === "VoHiYo").toString() + " <https://worldofwarcraft.com/fr-fr/invite/r9mGL2HbXZ?region=EU&faction=Horde> " + client.emojis.cache.find(emoji => emoji.name === "Horde").toString() + " et la sous faction : <https://www.worldofwarcraft.com/invite/ewoZ4JSPLk?region=EU&faction=Alliance>"+ client.emojis.cache.find(emoji => emoji.name === "issou").toString())
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
