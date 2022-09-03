import { ICommand } from 'wokcommands'

export default {
    category: 'Bot',
    description: 'Devuelve el ping en ms',
    slash: true,

    callback: ({ interaction }) => {
        interaction.reply({
            content: `🏓 Pong! \t Latencia: ${Math.round(interaction.client.ws.ping)}ms`,
            ephemeral: true
        })
        return
    }
} as ICommand

