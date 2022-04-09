const { MessageEmbed } = require("discord.js")

module.exports = (client, instance) => {
 
    client.on("guildMemberAdd", (member) => {
      const { guild } = member
  
      const channel = guild.channels.cache.find(
        (channel) => channel.name === "✨general✨"
      )

      if (!channel) {
        return
      }

      channel.send(
        new MessageEmbed()
        .setTitle(`:sparkles: Bienvenido ${member.user.tag}`)
        .setColor("GREEN")
        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
      )
    })
}
  
module.exports.config = {

    isplayName: 'Welcome Message',
    description: 'Sends a welcome message to new members',
    dbName: 'WELCOME MESSAGE'
}