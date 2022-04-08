const {MessageEmbed} = require("discord.js") 

module.exports = {  
    description: "Lista de comandos y demás.",
    slash: "both",
    category: "Bot",

    callback: async () => {
        return new MessageEmbed()
        .setTitle(`:robot: Lista de comandos`)
        .setFields(
            { name: "Comandos:", value: "`!91218`, `!ayuda`, `!clima`, `!dado`, `!dolar`, `!invitar`, `!soporte`, `!steaminfo`", inline: true },
        )
        .setColor("YELLOW")
        .setFooter({text: "Desarrollado por Mato#9265"})
    }
}