import { MessageEmbed } from 'discord.js';
const { QueryType } = require('discord-player');

export default {
    description: 'Reproduce una cancion',
    slash: 'both',
    category: 'Audio',

    callback: async ({ message, text }) => {

        const data = text;

        if (!data) return new MessageEmbed()
            .setDescription(`**:x: Debes ingresar un dato!** \n\n Ejemplo: \nrb play <nombre de la canción>\nrb play <url>`)
            .setColor('RED')
        if (!message.member.voice.channel) return new MessageEmbed()
            .setDescription(`:x: Debes estar dentro de un canal de voz para utilizar este comando `)
            .setColor('RED')

        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return new MessageEmbed()
            .setDescription(`:x: Debes estar dentro del mismo canal de voz para utilizar este comando `)
            .setColor('RED')

        const result = await player.search(data, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        })

        if (!result || !result.tracks.length) return new MessageEmbed()
            .setDescription(`:x: No encontrado! `)
            .setColor('RED')
        const track = result.tracks[0]

        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.member.voice.channel
            }
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id)
            return new MessageEmbed()
                .setDescription(`No puedo entrar a tu canal de voz!`)
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        if (!queue.playing) await queue.play();

        if (result.playlist) return new MessageEmbed()
            .setTitle(`Reproduciendo playlist`)
            .setDescription(`**[${result.playlist.title}](${result.playlist.url})** de **[${result.playlist.author.name}](${result.playlist.author.url})**\n\n**${result.tracks.length}** canciones de **${result.playlist.source}** agregadas a la cola!`)
            .setThumbnail(result.playlist.thumbnail)
            .setTimestamp()
            .setFooter({ text: `${message.member.displayName}` })
            .setColor('GREEN')

        return new MessageEmbed()
            .setDescription(`**[${track.title}](${track.url})**\nAñadida a la cola de reproduccion`)
            .setThumbnail(track.thumbnail)
            .setTimestamp()
            .setFooter({ text: `${message.member.displayName}` })
            .setColor('GREEN')
    }
}