import Discord from 'discord.js';
import WOKCommands from 'wokcommands';
import { Player } from 'discord-player';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
  intents: 14021
});

const player = new Player(client);

client.on("ready", () => {
  console.log(`${client.user?.tag} is alive!`)

  client.user?.setActivity('rb help');

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    typeScript: true,

    testServers: ["601084733144694785", "953839191182176306"],
  })
  .setDefaultPrefix('rb ')
  .setCategorySettings([
    {
      name: 'Bot',
      emoji: '🤖'
    },
    {
      name: 'Audio',
      emoji: '🎵'
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

export default player