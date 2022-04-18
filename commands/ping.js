module.exports = {
  category: 'Bot',
  description: 'Devuelve el ping en ms',
  slash: false,

  callback: ({ message }) => {
    const reply = `🏓 Pong! \t Latencia: ${Math.round(message.client.ws.ping)}ms`

    if (message) {
      message.reply({
        content: reply
      })
      return
    }
  }
}

