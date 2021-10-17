const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const { getTwitchOauthToken } = require("../../handlers/functions")

module.exports = {
  name: "creationDate",
  category: "Moderation",
  aliases: ["creation"],
  allowedChannels: ["629284733653745664"],
  usage: "creationDate <PSEUDO>",
  description: "Retourne la date de création de l'utilisateur spécifié",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    try {
      if (!args[0] || args[0].trim() === "") {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERREUR`)
          .setDescription("Aucune nom d'utilisateur spécifié")
        );
      }
      else {
        let token = await getTwitchOauthToken(process.env.CLIENT_ID_TWITCH, process.env.BOT_SECRET);
        twitch.api(
          {
            url: "https://api.twitch.tv/helix/users?login=" + args[0],
            method: "GET",
            headers: {
              Accept: "application/vnd.twitchtv.v5+json",
              "Client-ID": process.env.CLIENT_ID_TWITCH,
              "Authorization": "Bearer " + token
            }
          },
          function (err, res, body) {
            if (err) console.log(err);
            if (body.data[0] === undefined) {
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ ERREUR`)
                .setDescription("Le compte `" + args[0] + "` n'existe pas.")
              );
            } else {
              return message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`:white_check_mark: Utilisateur trouvé`)
                .setDescription("Le compte `" + args[0] + "` a été créé le "+new Date(body.data[0].created_at.split("T")[0]).toLocaleDateString('fr-FR'))
              );
            }
          }
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
