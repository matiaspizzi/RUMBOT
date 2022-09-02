import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
import getAppData from '../APIs/steamApi/getAppData';

export default {
    description: "Obtener info de un juego de steam.",
    slash: true,
    category: "Juegos & otros",
    options: [
        {
            name: "juego",
            description: "Nombre del juego",
            required: true,
            type: 3
        }
    ],

    callback: async ({ interaction }) => {
        const appName = interaction.options.getString('juego');
        const appData = await getAppData(appName!)
        if (appData === undefined) {
            return new MessageEmbed()
                .setTitle(`No se encontró el juego "${appName}"  :x:`)
                .setColor("RED")
        } else if (appData.is_free === false) {
            return new MessageEmbed()
                .setTitle(`:sparkles: ${appData.appName}`)
                .setColor("GREEN")
                .setDescription(appData.short_description)
                .setImage(appData.img_url)
                .setFields(
                    { name: "Descuento:", value: appData.discount_percent, inline: true },
                    { name: "Precio oficial:", value: appData.price_final, inline: true },
                    { name: "Con impuestos:", value: appData.realPrice, inline: true },
                    { name: "Tamaño:", value: appData.size, inline: false },
                    { name: "Abrir en explorador:", value: appData.store_url_explorer, inline: true },
                    { name: "Abrir en aplicación:", value: appData.store_url_app, inline: true },
                )
                .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
        } else if (appData.is_free === true) {
            return new MessageEmbed()
                .setTitle(`:sparkles: ${appData.appName} es gratis! :free:`)
                .setColor("BLUE")
                .setDescription(appData.short_description)
                .setImage(appData.img_url)
                .setFields(
                    { name: "Tamaño:", value: appData.size, inline: false },
                    { name: "Abrir en explorador:", value: appData.store_url_explorer, inline: true },
                    { name: "Abrir en aplicacion:", value: appData.store_url_app, inline: true },
                )
                .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
        }
    }
} as ICommand
