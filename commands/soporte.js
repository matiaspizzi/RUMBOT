const {MessageEmbed} = require("discord.js") 
const firebase = require("firebase-admin");

module.exports = {  
    description: "Send a message to the support team.",
    slash: false,
    category: "Bot",

    callback: async ({message, text}) => {
        if(text.length > 20){
            saveMessage({
                user: message.author.username,
                discriminator: message.author.discriminator,
                message: text,
            })
            return new MessageEmbed()
            .setTitle(`:sparkles: Reporte enviado, gracias ${message.author.username}!  :sparkles:`)
            .setColor("GREEN")
            .setTimestamp()
        }
        return new MessageEmbed()
        .setTitle(`:x: Error_!_`)
        .setFields(
            {name : "Forma de usar el comando:", value : "!soporte <descripción del problema>"},
            {name : "Ejemplo:", value : "!soporte el comando steamprice no funciona con el juego x"},
        )
        .setDescription(`Por favor, escriba un mensaje más largo. (minimo 20 caracteres)`)
        .setFooter({text: "Si el mensaje es inapropiado, corre riesgo de ser baneado."})
        .setColor("RED")
    }
}

const saveMessage = (data) => {
    data = {...data, timestamp: new Date(Date.now()).toLocaleDateString()}
    firebase.firestore().collection("soporteMensajes").add(data)
}