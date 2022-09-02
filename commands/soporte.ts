import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
import firebase from 'firebase-admin'

export default {
    description: "Envía un mensaje a soporte.",
    slash: true,
    category: "Bot",
    testOnly: true,
    options: [
        {
            name: "mensaje",
            description: "Mensaje a enviar",
            required: true,
            type: 3
        }
    ],

    callback: async ({ interaction }) => {
        const message = interaction.options.getString('mensaje');
        if (message && message.length > 20) {
            saveMessage({
                user: `${interaction.user.username}#${interaction.user.discriminator}`,
                message: message
            })
            return new MessageEmbed()
                .setTitle(`:sparkles: Reporte enviado, gracias ${interaction.user.username}!  :sparkles:`)
                .setColor("GREEN")
                .setTimestamp()
        }
        return new MessageEmbed()
            .setTitle(`:x: Error_!_`)
            .setFields(
                { name: "Forma de usar el comando:", value: "rb soporte <descripción del problema>" },
                { name: "Ejemplo:", value: "rb soporte el comando stinfo no funciona con el juego x" },
            )
            .setDescription(`Por favor, escriba un mensaje más largo. (mínimo 20 caracteres)`)
            .setFooter({ text: "Si el mensaje es inapropiado, corre riesgo de ser baneado." })
            .setColor("RED")
    }
} as ICommand

const saveMessage = (data: any) => {
    data = { ...data, timestamp: new Date(Date.now()).toLocaleDateString() }
    firebase.firestore().collection("soporteMensajes").add(data)
}