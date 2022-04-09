const Discord = require("discord.js") 
const WOKCommands = require("wokcommands") 
const path = require("path") 
require('dotenv').config()

const client = new Discord.Client({
  intents: 14021
});

client.on("ready", () => {
  console.log(`${client.user.tag} is alive!`)

  client.user.setActivity('rb ayuda');

  const __dirname = path.resolve(path.dirname(''));
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),

    testServers: ["601084733144694785", "953839191182176306"],
  })
  .setDefaultPrefix('rb ')
  .setCategorySettings([
    {
      name: 'Bot',
      emoji: '🤖'
    },
    {
        name: 'Juegos & otros',
        emoji: '🎮'
    },
    {
        name: 'Economía',
        emoji: '💸'
    },

    {
      name: 'Clima',
      emoji: '☀️'
  }
])
})

client.login(process.env.DISCORD_CLIENT_TOKEN)