import { MessageEmbed } from 'discord.js';

export default {
    description: 'Reanuda la reproduccion',
    slash: 'both',
    category: 'Audio',

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id)

        if (!queue) return new MessageEmbed()
            .setDescription(`No hay canciones en la cola de reproduccion`)

        queue.setPaused(false)
        return new MessageEmbed()
            .setDescription(`Reproduccion reanudada, para pausar use 'rb pause'`)
            .setColor('BLACK')
    },
}