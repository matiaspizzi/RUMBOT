const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Aleatoriza la cola de reproducción",
    slash: "both",
    category: "Audio",
	callback: async ({ message }) => {
		const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
        .setDescription(`Actualmente no se esta reproduciendo música`)
        .setColor("RED")

		queue.shuffle()
        return new MessageEmbed()
        .setDescription(`La cola de ${queue.tracks.length} canciones ha sido aleatorizada`)
        .setColor("GREEN")
	},
}