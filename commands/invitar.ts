import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    description: 'Invitar al Bot a tu server.',
    slash: true,
    category: 'Bot',

    callback: async ({ interaction }) => {
        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`:sparkles: Invita a RumBot a tu server`)
                .setColor('GREEN')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=956768087657545728&permissions=8&scope=applications.commands%20bot')
            ],
            ephemeral: true
        })
        return
    }
} as ICommand
