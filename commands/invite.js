const {MessageEmbed} = require("discord.js") 

module.exports = {  
    description: "Invite RumBot to your server.",
    slash: "both",
    category: "Bot",

    callback: async () => {
        return new MessageEmbed()
        .setTitle(`:sparkles: Invite RumBot to your server :sparkles:`)
        .setColor("GREEN")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=956768087657545728&permissions=8&scope=applications.commands%20bot")
    }
}
