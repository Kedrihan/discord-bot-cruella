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
    let s = data.duration < 2 ? "seconde" : "secondes";
    return logsModerationTwitchDiscordChannel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`:x: TIMEOUT :x:`)
      .setDescription("```"+data.target.name + " a été timeout par " + data.moderator.name + " pendant " + data.duration + " " + s + "\n https://www.twitch.tv/popout/cruelladk/viewercard/" + data.target.name+"```")
    );
  } catch (e) {
    return message.channel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ ERREUR | Une erreur est survenue avec l'event de timeout.`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }
  /**
    * @INFO
    * Bot Coded by Kedrihan
  */
}
