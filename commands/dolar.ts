import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
import getDolar from '../APIs/dolarApi/getDolar';

export default {
    description: 'Cotización del dolar en pesos argentinos',
    slash: true,
    category: 'Economía',

    callback: async ({ interaction }) => {
        await interaction.deferReply()
        let dolarData: any = await getDolar()
        if (dolarData == null) {
            await interaction.editReply({
                embeds: [
                    new MessageEmbed()
                    .setTitle(`No se pudo obtener datos  :x:`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return
        } 
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setTitle(`:sparkles: DOLAR`)
                .setDescription(`Cotizaciones del **dolar** en **pesos argentinos** \n\n :calendar_spiral: **Actualizado:** ${dolarData[9].fecha._text} - ${dolarData[9].hora._text}\n\n **Riesgo País**: ${dolarData[6].compra._text} \n\n **Circulante**: ${dolarData[8].compra._text}M ARS \n **Reservas**: ${dolarData[7].compra._text}M USD `)
                .setColor('GREEN')
                .setThumbnail('https://i.imgur.com/exPW606.png')
                .setFields(
                    { name: '__Dolar Oficial__:', value: `:dollar: :regional_indicator_c: **${dolarData[0].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[0].venta._text}**`, inline: true },
                    { name: '__Dolar Blue__:', value: `:dollar: :regional_indicator_c: **${dolarData[1].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[1].venta._text}**`, inline: true },
                    { name: '__Contado con Liqui__:', value: `:dollar: :regional_indicator_c: **${dolarData[2].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[2].venta._text}**`, inline: true },
                    { name: '__Dolar Bolsa__:', value: `:dollar: :regional_indicator_c: **${dolarData[3].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[3].venta._text}**`, inline: true },
                    { name: '__Dolar Turista__:', value: `:dollar: :regional_indicator_c: **${dolarData[4].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[4].venta._text}**`, inline: true },
                    { name: '__Dolar Mayorista__:', value: `:dollar: :regional_indicator_c: **${dolarData[5].compra._text}** \n :dollar: :regional_indicator_v: **${dolarData[5].venta._text}**`, inline: true },
                )
                .setFooter({ text: 'Si no funciona correctamente, por favor avisar en /soporte' })
                .setTimestamp()
            ]
        })
        return
    }
} as ICommand
