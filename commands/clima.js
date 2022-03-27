const getClima = require('../weatherApi/main.js')
const {MessageEmbed} = require("discord.js") 

module.exports = {  
    description: "Indique la ciudad y obtenga datos sobre el clima.",
    slash: "both",
    category: "Clima",

    callback: async ({text}) => {   
        const ciudad = `${text}`
        const data = await getClima(ciudad)
        console.log(data)
        if(data){ 
            let icon
            let color
            if(data.is_day == "no"){
                icon = ":full_moon:"
                color = "BLUE"
            } else {
                icon = ":sunny:"
                color = "YELLOW"
            }
            return new MessageEmbed()
            .setTitle(`${icon}  ${data.location}`)
            .setFields(
                {name : "Clima:", value : data.weather_descriptions, inline : true},
                {name : "Temperatura:", value : `${data.temperature}℃`, inline : true},
                {name : "Humedad:", value : `${data.humidity}%`, inline : true},
                {name : "Viento:", value : `${data.wind_speed}km/h`, inline : true},
            )
            .setFooter({text: `${data.time} \n Para mas información: !clima \t\t\t\t\t Powered by: weatherstack.com `})
            .setThumbnail(data.weather_icons)
            .setColor(color)
        } else {
            console.log(`data : ${data}`)
            return new MessageEmbed()
            .setTitle("Por favor, escriba un parámetro válido.")
            .setFields(
                {name : "Entre ellos:", value : "Ubicaciones: _Buenos Aires, Distrito Federal, Argentina_ \n Coordenadas: _-34.608214,-58.370266_ \n Direcciones IP: _190.174.XXX.XXX_"},
                {name : "Forma de usar el comando:", value : "!clima <parámetro>"},
                {name : "Ejemplos:", value : "!clima Buenos Aires, Argentina \n !clima -84.907230, 63.834074"},
            )
            .setFooter({text: "Si tenés algún problema, contacte con !soporte."})
            .setColor("RED")
        }
    }
}