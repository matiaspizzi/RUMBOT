import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
import firebase from 'firebase-admin'

export default {
    description: 'Envía un mensaje a soporte.',
    slash: true,
    category: 'Bot',
    options: [
        {
            name: 'mensaje',
            description: 'Mensaje a enviar',
            required: true,
            type: 3,
        }
    ],

    callback: async ({ interaction }) => {
        const message = interaction.options.getString('mensaje');
        if (message && message.length > 20) {
            saveMessage({
                user: `${interaction.user.username}#${interaction.user.discriminator}`,
                message: message
            })
            await interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`:sparkles: Reporte enviado, gracias ${interaction.user.username}!  :sparkles:`)
                    .setColor('GREEN')
                    .setTimestamp()
                ],
                ephemeral: true
            })
            return
        }
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                .setTitle(`:x: Por favor, escriba un mensaje más largo. (mínimo 20 caracteres)_!_`)
                .setDescription('Si el mensaje es inapropiado, podría ser baneado.')
                .setColor('RED')
            ], 
            ephemeral: true
        })
    }
} as ICommand

const saveMessage = (data: any) => {
    data = { ...data, timestamp: new Date(Date.now()).toLocaleDateString() }
    firebase.firestore().collection('soporteMensajes').add(data)
}