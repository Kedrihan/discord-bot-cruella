/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...

//here the event starts
module.exports = async (client, twitch, pubsub, data) => {
  const logsModerationTwitchDiscordChannel = client.channels.cache.get("629284733653745664");
  try {
    return logsModerationTwitchDiscordChannel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`:no_entry: BAN :no_entry:`)
      .setDescription("```"+data.target.name + " a été ban par " + data.moderator.name + "`\n https://www.twitch.tv/popout/cruelladk/viewercard/" + data.target.name+"```")
    );

  } catch (e) {
    return logsModerationTwitchDiscordChannel.send(
      new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ ERREUR | Une erreur est survenue avec l'event de ban`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
    );
  }
  /**
    * @INFO
    * Bot Coded by Kedrihan
  */
}
