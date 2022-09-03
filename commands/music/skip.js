import { MessageEmbed } from 'discord.js';

export default {
    description: 'Salta la canción actual',
    slash: 'both',
    category: 'Audio',

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)

        const currentSong = queue.current

        queue.skip()
        return new MessageEmbed()
            .setDescription(`**${currentSong.title}** ha sido omitida!`)
    },
}