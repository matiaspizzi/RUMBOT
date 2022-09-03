import { MessageEmbed } from 'discord.js';

module.exports = (client, instance) => {
 
    client.on('guildMemberAdd', (member) => {
      const { guild } = member
  
      const channel = guild.channels.cache.find(
        (channel) => channel.name === '✨general✨'
      )

      if (!channel) {
        return
      }

      return new MessageEmbed()
        .setTitle(`:sparkles: Bienvenido ${member}`)
        .setColor('GREEN')
        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
      
    })
}
  
module.exports.config = {

    displayName: 'Welcome Message',
    description: 'Sends a welcome message to new members',
    dbName: 'WELCOME MESSAGE'
}