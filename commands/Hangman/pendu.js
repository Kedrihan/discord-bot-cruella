const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const { reloadEmbedHangman, initHangman } = require("../../handlers/functions");
module.exports = {
  name: "pendu",
  category: "Hangman",
  aliases: [],
  allowedChannels: ["552475150826602506"],
  usage: "pendu",
  description: "Lance une partie de pendu",
  run: async (client, message, args, user, text, prefix) => {
    try {
      if (!client.hangman.isLaunched) {
        let msg = await message.channel.send(new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`Chargement du pendu....`));

        initHangman(client.hangman).then((response) => {
          msg.edit(new MessageEmbed()
            .setColor(ee.color)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`Pendu initialisé !`)
            .setDescription(response)
          );
          return message.channel.send(client.hangman.embedMessage)
        })
      }
      else {
        if (args[0] == "stop" && (message.member.roles.cache.some(role => role.name === 'mod') || message.member.roles.cache.some(role => role.name === 'admin'))) {
          client.hangman.isLaunched = false;
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ | Partie stoppée.`)
            .setDescription("Le modérateur " + message.author.toString() + " a mit fin au pendu."));
        }
        reloadEmbedHangman(client.hangman)
        return message.channel.send(client.hangman.embedMessage)
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
