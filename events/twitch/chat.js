/**
  * @INFO
  * Loading all needed File Information Parameters
*/

const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const { getTwitchOauthToken } = require("../../handlers/functions")

//here the event starts
module.exports = async (client, twitch, pubsub, channel, user, message, isSelf) => {
  try {
    if (isSelf) return;
    const newChattersTwitchDiscordChannel = client.channels.cache.get("629283451832631296");
    console.log()
    let username = user["display-name"].toLowerCase();
    let token = await getTwitchOauthToken(process.env.CLIENT_ID_TWITCH, process.env.BOT_SECRET);
    twitch.api(
      {
        url: "https://api.twitch.tv/helix/users?login=" + username,
        method: "GET",
        headers: {
          Accept: "application/vnd.twitchtv.v5+json",
          "Client-ID": process.env.CLIENT_ID_TWITCH,
          "Authorization": "Bearer " + token
        }
      },
      function (err, res, body) {
        if (err) console.log(err)
        if (body.users && body.users[0]) {
          let created_at_insert = body.users[0].created_at.split("T")[0];

          if (new Date().toLocaleDateString('fr-FR') === new Date(created_at_insert).toLocaleDateString('fr-FR')) {
            return newChattersTwitchDiscordChannel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`:octagonal_sign: Nouvel utilisateur :octagonal_sign:`)
              .setDescription("Le compte **" + username + "** a été créé aujourd'hui (le " + new Date(created_at_insert).toLocaleDateString('fr-FR') + ") \n <https://www.twitch.tv/popout/cruelladk/viewercard/" + username + ">")
            );
          }
        }

      }
    );



  } catch (e) {
    return newChattersTwitchDiscordChannel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ ERREUR | Une erreur est survenue sur la détection de nouveaux comptes.`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }
  /**
    * @INFO
    * Bot Coded by Kedrihan
  */
}
