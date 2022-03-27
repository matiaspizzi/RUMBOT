const Discord = require("discord.js") 
const WOKCommands = require("wokcommands") 
const path = require("path") 
require('dotenv').config()

const client = new Discord.Client({
  intents: 14021
});

client.on("ready", () => {
  console.log(`${client.user.tag} is alive!`)

  const __dirname = path.resolve(path.dirname(''));
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    testServers: ["601084733144694785", "953839191182176306"],
  })

})

client.login(process.env.DISCORD_CLIENT_TOKEN)