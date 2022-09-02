import { MessageEmbed } from 'discord.js';
import { player } from '../../index'

export default {
    description: "Vuelve a la canción anterior",
    slash: "both",
    category: "Audio",

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)

        queue.back()

        return new MessageEmbed()
            .setDescription(`Volviendo a la canción anterior`)
    }
}