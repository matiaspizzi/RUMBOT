const {MessageEmbed} = require("discord.js") 

module.exports = {  
    description: "Lista de comandos y demás.",
    slash: "both",
    category: "Bot",

    callback: async () => {
        return new MessageEmbed()
        .setTitle(`:robot: Lista de comandos`)
        .setFields(
            { name: "Comandos:", value: "`soporte`, `ping`, `invitar`, `clima`, `dado`, `dolar`, `steaminfo`, `91218`", inline: true },
        )
        .setColor("YELLOW")
        .setFooter({text: "Desarrollado por Mato#9265"})
    }
}