const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "ping",
  category: "Information",
  aliases: ["latency"],
  allowedChannels: ["810798779321679913", "629284733653745664", "895396809252425769"],
  usage: "ping",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    try {
      message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`🏓 Ping....`)
      ).then(msg => {
        msg.edit(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`🏓 Pong \`${Math.round(client.ws.ping)}ms\``)
        );
      })
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
