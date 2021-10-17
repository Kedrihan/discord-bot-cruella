const { MessageEmbed } = require("discord.js");
const ee = require("../../botconfig/embed.json");
const { displayHangman, reloadEmbedHangman } = require("../../handlers/functions");
module.exports = {
  name: "devine",
  category: "Hangman",
  aliases: [],
  allowedChannels: ["552475150826602506"],
  usage: "devine <LETTRE>, devine <MOT>",
  description: "Tentative pour deviner une lettre ou un mot au pendu",
  run: async (client, twitch, pubsub, message, args, user, text, prefix) => {
    try {
      if (!client.hangman.isLaunched) {
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ ERREUR | Aucune partie de pendu en cours.`)
          .setDescription("Lancez une partie avec la commande " + prefix + "pendu."));
      }
      else {
        //devine une lettre
        if (args[0].match(/^[a-zA-Z]$/)) {
          client.hangman.essais++;
          client.hangman.lettreDemandee = args[0];

          //lettre deja demandée
          if (client.hangman.alphabet.includes(client.hangman.lettreDemandee.toLowerCase())) {
            message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`❌ | Lettre déjà demandée.`)
              .setDescription("La lettre " + client.hangman.lettreDemandee.toUpperCase() + " a déjà été demandée")
            );
            reloadEmbedHangman(client.hangman)
            return message.channel.send(client.hangman.embedMessage)

          }
          //lettre absente
          if (!client.hangman.arrayMotAFaireDeviner.includes(client.hangman.lettreDemandee.toUpperCase())) {
            client.hangman.erreurs++;
            if (client.hangman.erreurs < 10) {
              client.hangman.alphabet.push(client.hangman.lettreDemandee);
              message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ | Lettre absente.`)
                .setDescription("La lettre " + client.hangman.lettreDemandee.toUpperCase() + " n'est pas présente.")
              );
              reloadEmbedHangman(client.hangman)
              return message.channel.send(client.hangman.embedMessage)
            } else {
              client.hangman.isLaunched = false;
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ | Défaite !`)
                .setDescription(displayHangman(10) + "Vous êtes pendu ! Le mot a trouver était `" + client.hangman.motAFaireDeviner.toUpperCase() + "`")
              );

            }

          } else {//lettre présente
            while (client.hangman.arrayMotAFaireDeviner.includes(client.hangman.lettreDemandee.toUpperCase())) {
              client.hangman.tirets[client.hangman.arrayMotAFaireDeviner.indexOf(client.hangman.lettreDemandee.toUpperCase())] = client.hangman.lettreDemandee.toUpperCase();
              client.hangman.arrayMotAFaireDeviner.splice(client.hangman.arrayMotAFaireDeviner.indexOf(client.hangman.lettreDemandee.toUpperCase()), 1, ' ');
              client.hangman.messageTabFaireDeviner = client.hangman.tirets.toString().replace(new RegExp(",", "g"), ' ');
            }
            if (client.hangman.tirets.indexOf('_') === -1) {
              client.hangman.isLaunched = false;//win
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wincolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`:white_check_mark: | Victoire !`)
                .setDescription(displayHangman(client.hangman.erreurs) + " Bravo " + message.author.username + " ! Vous avez trouvé le mot `" + client.hangman.motAFaireDeviner.toUpperCase() + "` avec **" + client.hangman.erreurs + "** erreurs et **" + client.hangman.essais + "** essais !")
              );

            } else {
              client.hangman.alphabet.push(client.hangman.lettreDemandee);
              reloadEmbedHangman(client.hangman)
              return message.channel.send(client.hangman.embedMessage);
            }
          }
        }
        //devine un mot
        if (args[0].match(/^[a-zA-Z-]+$/)) {
          client.hangman.essais++;
          if (args[0].toLowerCase() === client.hangman.motAFaireDeviner.toLowerCase()) {

            client.hangman.isLaunched = false;//win
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wincolor)
              .setFooter(ee.footertext, ee.footericon)
              .setTitle(`:white_check_mark: | Victoire !`)
              .setDescription(displayHangman(client.hangman.erreurs) + " Bravo " + message.author.username + " ! Vous avez trouvé le mot `" + client.hangman.motAFaireDeviner.toUpperCase() + "` avec **" + client.hangman.erreurs + "** erreurs et **" + client.hangman.essais + "** essais !")
            );
          } else {
            client.hangman.erreurs++;
            if (client.hangman.erreurs < 10) {
              message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ | Mauvais mot.`)
                .setDescription(args[0].toUpperCase() + " n'est pas le bon mot.")
              );
              reloadEmbedHangman(client.hangman)
              return message.channel.send(client.hangman.embedMessage)
            } else {
              client.hangman.isLaunched = false;
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`❌ | Défaite !`)
                .setDescription(displayHangman(10) + "Vous êtes pendu ! Le mot a trouver était `" + client.hangman.motAFaireDeviner.toUpperCase() + "`")
              );
            }
          }
        }
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
