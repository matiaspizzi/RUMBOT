const {MessageEmbed} = require("discord.js") 

module.exports = {  
    description: "Throw a dice, and get a random number between 1 and 6.",
    slash: "both",
    category: "Fun",

    callback: async () => {
        const number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        return new MessageEmbed()
        .setTitle(`:game_die:  ${number}`)
        .setColor("RED")
    }
}