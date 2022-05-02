const { readdirSync } = require("fs");
console.log("Welcome to SERVICE HANDLER".yellow);
module.exports = (client) => {
  try {
    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/${dir}/${file}`);
        if (pull.name) {
          client.commands.set(pull.name, pull);
          console.log(file + " -> Ready");
        } else {
          console.log(file + ` -> error->missing a help.name,or help.name is not a string.`);
          continue;
        }
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
};