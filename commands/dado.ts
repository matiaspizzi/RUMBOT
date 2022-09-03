import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    description: 'Tirar dado.',
    slash: true,
    category: 'Juegos & otros',

    callback: async ({ interaction }) => {
        const number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`:game_die:  ${number}`)
                .setColor('RED')
            ]
        })
        return
    }
} as ICommand