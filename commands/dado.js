const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Tirar dado.",
    slash: "both",
    category: "Juegos & otros",

    callback: async () => {
        const number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        return new MessageEmbed()
            .setTitle(`:game_die:  ${number}`)
            .setColor("RED")
    }
}