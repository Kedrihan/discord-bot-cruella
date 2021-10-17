/**
  * @INFO
  * Loading all needed File Information Parameters
*/

const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const { MessageEmbed } = require("discord.js");

//here the event starts
module.exports = async (client, twitch, pubsub, data) => {
  const logsModerationTwitchDiscordChannel = client.channels.cache.get("629284733653745664");
  try {
    return logsModerationTwitchDiscordChannel.send(new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`:angel: UNBAN :angel:`)
      .setDescription(data.target.name + " a été unban par " + data.moderator.name + "\n https://www.twitch.tv/popout/cruelladk/viewercard/" + data.target.name)
    );
  } catch (e) {
    return logsModerationTwitchDiscordChannel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ ERREUR | Une erreur est survenue avec l'event d'unban.`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }
  /**
    * @INFO
    * Bot Coded by Kedrihan
  */
}
