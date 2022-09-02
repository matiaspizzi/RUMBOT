import { MessageEmbed } from 'discord.js';

export default {
    description: "Pausa la reproduccion",
    slash: "both",
    category: "Audio",

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return new MessageEmbed()
            .setDescription(`No hay canciones en la cola de reproduccion`)

        queue.setPaused(true);
        return new MessageEmbed()
            .setDescription(`Reproduccion pausada, para reanudar use "rb resume"`)
    },
}
