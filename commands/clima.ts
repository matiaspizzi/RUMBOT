import getWeather from '../APIs/weatherApi/getWeather';
import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    description: 'Indique la ubicación y obtenga datos sobre el clima.',
    slash: true,
    category: 'Clima',
    testOnly: true,
    options: [
        {
            name: 'ubicacion',
            description: 'ubicación',
            required: true,
            type: 3
        }
    ],

    callback: async ({ interaction }) => {
        const ubicacion = `${interaction.options.getString('ubicacion')}`
        const data = await getWeather(ubicacion)
        await interaction.deferReply()
        if (data) {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`${data.location}`)
                    .setFields(
                        { name: 'Clima:', value: data.weather_descriptions, inline: true },
                        { name: 'Temperatura:', value: `${data.temperature}℃`, inline: true },
                        { name: 'Humedad:', value: `${data.humidity}%`, inline: true },
                        { name: 'Viento:', value: `${data.wind_speed}km/h`, inline: true },
                    )
                    .setFooter({ text: `Powered by: weatherstack.com` })
                    .setThumbnail(data.weather_icons)
                    .setTimestamp()
                    .setColor('AQUA')
                ]
            })
        } else {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                .setTitle('Por favor, escriba un parámetro válido.')
                .setFields(
                    { name: 'Entre ellos:', value: 'Ubicaciones: _Buenos Aires, Distrito Federal, Argentina_ \n Coordenadas: _-34.608214,-58.370266_ \n Direcciones IP: _190.174.XXX.XXX_' }
                )
                .setFooter({ text: 'Si no funciona correctamente, por favor avisar en /soporte' })
                .setColor('RED')
                ]
            })
        }
    }
} as ICommand