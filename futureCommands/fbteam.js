const {MessageEmbed} = require("discord.js") 
const getTeamData = require("../footballApi/getTeamData.js") 

module.exports = {  
    description: "Get data of a football team.",
    slash: false,
    category: "Football",

    callback: async ({text}) => {
        if(text){
            const comaIndex = text.indexOf(",")
            const team = text.substring(0, comaIndex).trim()
            const country = text.substring(comaIndex + 1).trim()
            const appData = await getTeamData(team, country)
            if (appData.results == 0){
                return new MessageEmbed()
                .setTitle(`No se encontró el equipo "${team}"  :x:`)
                .setColor("RED")
            } else if(appData.results > 0){
                return new MessageEmbed()
                    .setTitle(`:sparkles: ${appData.response[0].team.name}\n`)
                    .setColor("GREEN")
                    .setThumbnail(appData.response[0].team.logo)
                    .setFields(
                        {name : "id", value : `${appData.response[0].team.id}`, inline : true},
                        {name : "Founded", value : `${appData.response[0].team.founded}`, inline : true},
                        {name : "Capacity:", value : `${appData.response[0].venue.capacity}`, inline : true},
                        {name : "Stadium:", value : appData.response[0].venue.name, inline : false},
                        {name : "Address:", value : appData.response[0].venue.address, inline : false},
                        {name : "City:", value : appData.response[0].venue.city, inline : false},
                    )
                    .setImage(appData.response[0].venue.image)
                    .setFooter({text: "Si no funciona correctamente, por favor avisar en !soporte"})
            }
        } else {
            return new MessageEmbed()
                .setTitle(`**Por favor, escriba un parámetro válido.**`)
                .setFields(
                    {name : "Entre ellos:", value : "Nombres de equipos: _River Plate_ \nPaís de origen: _Argentina_"},
                    {name : "Forma de usar el comando:", value : "!football <parámetro>, <parámetro>"},
                    {name : "Ejemplos:", value : "!football River Plate, Argentina"},
                )
                .setFooter({text: "Si no funciona correctamente, por favor avisar en !soporte"})
                .setColor("RED")
        }
    }
}