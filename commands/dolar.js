const { MessageEmbed } = require("discord.js")
const getDolar = require("../APIs/dolarApi/getDolar.js")

module.exports = {
    description: "Cotizacion del dolar en pesos argentinos",
    slash: false,
    category: "Dolar",

    callback: async () => {

        const dolarData = await getDolar()
        if (dolarData === undefined) {
            return new MessageEmbed()
                .setTitle(`No se pudo obtener datos  :x:`)
                .setColor("RED")
        } else if (dolarData) {
            const reservas = parseInt(dolarData[7].valor) / 1000000
            return new MessageEmbed()
                .setTitle(`:sparkles: DOLAR`)
                .setDescription(`Cotizaciones del **dolar** en **pesos argentinos** \n\n :calendar_spiral: ${dolarData[0].fecha}\n\n **Riesgo País**: ${dolarData[8].valor / 1000} \n\n **Reservas BCRA**: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(reservas)}M ${dolarData[7].moneda}`)
                .setColor("GREEN")
                .setThumbnail("https://i.imgur.com/exPW606.png")
                .setFields(
                    { name: "__Dolar Oficial__:", value: `:dollar: :regional_indicator_c: **${dolarData[0].compra}** \n :dollar: :regional_indicator_v: **${dolarData[0].venta}**`, inline: true },
                    { name: "__Dolar Blue__:", value: `:dollar: :regional_indicator_c: **${dolarData[1].compra}** \n :dollar: :regional_indicator_v: **${dolarData[1].venta}**`, inline: true },
                    { name: "__Contado con Liqui__:", value: `:dollar: :regional_indicator_c: **${dolarData[2].compra}** \n :dollar: :regional_indicator_v: **${dolarData[2].venta}**`, inline: true },
                    { name: "__Dolar Promedio__:", value: `:dollar: :regional_indicator_c: **${dolarData[3].compra}** \n :dollar: :regional_indicator_v: **${dolarData[3].venta}**`, inline: true },
                    { name: "__Dolar Turista__:", value: `:dollar: :regional_indicator_c: **${dolarData[4].compra}** \n :dollar: :regional_indicator_v: **${dolarData[4].venta}**`, inline: true },
                    { name: "__Dolar Bolsa__:", value: `:dollar: :regional_indicator_c: **${dolarData[5].compra}** \n :dollar: :regional_indicator_v: **${dolarData[5].venta}**`, inline: true },
                    { name: "__Dolar mayorista__:", value: `:dollar: :regional_indicator_c: **${dolarData[6].compra}** \n :dollar: :regional_indicator_v: **${dolarData[6].venta}**`, inline: true },
                )
                .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
        }
    }
}
