const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Termina la reproducción",
    slash: "both",
    category: "Audio",

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)
            .setColor("RED")

        queue.clear()
        queue.destroy();
        return new MessageEmbed()
            .setDescription(`Parando la reproducción, nos vemos la próxima :wink:`)
    },
}