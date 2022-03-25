import Discord from "discord.js";
import getAppData from "./steamApi/getAppData.js";

const client = new Discord.Client({
  intents: 14021
});

client.on("ready", () => {
  console.log(`${client.user.tag} is alive!`)

  const guildIds = ["601084733144694785", "953839191182176306"]
  const guild = client.guilds.cache.get(guildIds)
  let commands

  if(guild){
    commands = guild.commands
  } else {
    commands = client.application.commands
  }

  commands.create({
    name: "dice",
    description: "Throw a dice, and get a random number between 1 and 6."
  })

  commands.create({
    name: "steamprice",
    description: "Get the price of a game on Pesos Argentos.",
    options: [{
      name: "nombre",
      description: "The name of the game.",
      required: true,
      type: 3 // 3 = string
    }]
  })
})

client.on("interactionCreate", async (interaction) => {
  if(!interaction.isCommand()){
    return
  }


  
  const { commandName, options } = interaction



  if(commandName === "dice") {
    const number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
    interaction.reply(`:game_die:   ${number}`)
  


  } else if((commandName).toLowerCase() === "steamprice") {
    const appName = options._hoistedOptions[0].value
    const appData = await getAppData(appName)
    if (appData == undefined){
      interaction.reply(`:sparkles: No se encontró el juego "${appName.charAt(0).toUpperCase() + appName.slice(1)}"`)
    } else if (appData == false){
      interaction.reply(`:sparkles: ${appName.charAt(0).toUpperCase() + appName.slice(1)} es gratis :free:`)
    } else if(appData.appName){
      interaction.reply(`:sparkles: **${appData.appName}** tiene un precio oficial de **${appData.officialPrice}** y un precio real de **${appData.realPrice}** (+65%)`)
    }
  }
})


client.login("OTU2NzY4MDg3NjU3NTQ1NzI4.Yj1Btw.-6OXYk8YZM-pIxBNBqTjylCG0qs");