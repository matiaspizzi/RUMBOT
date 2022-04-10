const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Pausa la reproducción",
    slash: "both",
    category: "Audio",

	callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
        .setDescription(`Actualmente no se esta reproduciendo música`)
        .setColor("RED")

        queue.destroy();
        return new MessageEmbed()
        .setDescription(`Dejando de reproducir música, nos vemos la próxima :wink:`)
        .setColor("GREEN")
	},
}