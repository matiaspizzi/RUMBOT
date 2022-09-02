import { MessageEmbed } from 'discord.js';

export default {
    description: "Salta a la canción seleccionada",
    slash: "both",
    category: "Audio",

    callback: async ({ message, text }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)

        const trackNum = parseInt(text)

        if (trackNum > queue.tracks.length) return new MessageEmbed()
            .setDescription(`No existe una canción con el número ${trackNum}!`)

        const omitida = queue.current

        queue.jump(trackNum - 1)

        return new MessageEmbed()
            .setDescription(`**${omitida.title}** ha sido omitida! :arrow_right: Saltando a **${queue.tracks[0].title}**`)
    }
}