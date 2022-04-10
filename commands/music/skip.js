const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Salta la canción actual",
    slash: "both",
    category: "Audio",
    
    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return new MessageEmbed()
        .setDescription(`Actualmente no se esta reproduciendo música`)
        .setColor("RED")

        const currentSong = queue.current

		queue.skip()
        return new MessageEmbed()
        .setDescription(`:white_check_mark: ${currentSong.title} ha sido omitida!`)
        .setColor("GREEN")
	},
}