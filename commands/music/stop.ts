import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
import player from '../../index';

export default {
    description: "Termina la reproducción",
    slash: true,
    category: "Audio",

    callback: async ({ interaction }) => {
        const queue = player.getQueue(`${interaction.guild?.id}`);

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)
            .setColor("RED")

        queue.clear()
        queue.destroy();
        return new MessageEmbed()
            .setDescription(`Parando la reproducción, nos vemos la próxima :wink:`)
    },
} as ICommand