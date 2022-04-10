const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Pausa la reproduccion",
    slash: "both",
    category: "Audio",

	callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);
        
		if (!queue) return new MessageEmbed()
            .setDescription(`No hay canciones en la cola de reproduccion`)
            .setColor("RED")

        queue.setPaused(true);
        return new MessageEmbed()
            .setDescription(`Reproduccion pausada, para reanudar use "rb resume"`)
            .setColor("WHITE")
	},
}
