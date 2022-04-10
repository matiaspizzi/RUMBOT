const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Salta a la canción seleccionada",
    slash: "both",
    category: "Audio",
    
    callback: async ({ message, text }) => {
        const queue = player.getQueue(message.guild.id);
        
		if (!queue || !queue.playing) return new MessageEmbed()
        .setDescription(`Actualmente no se esta reproduciendo música`)
        .setColor("RED")

        const trackNum = parseInt(text)

        if (trackNum > queue.tracks.length) return new MessageEmbed()
        .setDescription(`:x: No existe una canción con el número ${trackNum}!`)
        .setColor("RED")

        const omitida = queue.current

        queue.skipTo(trackNum - 1)

        return new MessageEmbed()
        .setDescription(`:white_check_mark: **${omitida.title}** ha sido omitida! :arrow_right: Saltando a **${queue.tracks[0].title}**`)
        .setColor("GREEN")
	}
}