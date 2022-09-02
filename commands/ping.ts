import { ICommand } from "wokcommands"

export default {
  category: 'Bot',
  description: 'Devuelve el ping en ms',
  slash: true,
  testOnly: true,

  callback: ({ interaction }) => {
    const reply = `🏓 Pong! \t Latencia: ${Math.round(interaction.client.ws.ping)}ms`

    if (interaction) {
      interaction.reply({
        content: reply
      })
      return
    }
  }
} as ICommand

