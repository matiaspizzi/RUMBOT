import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    description: "Qué pasó el 9/12/18?",
    slash: true,
    category: "Juegos & otros",

    callback: async () => {
        return new MessageEmbed()
            .setTitle(`:sparkles: __9/12/18__: La gloria eterna desde Núñez a Madrid.`)
            .setThumbnail("https://e00-marca.uecdn.es/assets/datos-deportivos/escudos/opta/png/128x128/608.png")
            .setFields(
                { name: "¿Qué pasó?", value: 'River Plate se consagró campeón de la Copa Libertadores 2018 tras vencer por **3-1** a Boca Juniors en la final que se disputó en el estadio Santiago Bernabéu de Madrid. Es la cuarta vez en la historia que el conjunto de Núñez se alza con el torneo más importante del continente. \n\nIgualaron 1-1 en el tiempo regular. "El Xeneize" se adelantó con gol de Darío Benedetto a los 42 minutos del primer tiempo. Igualó Lucas Pratto a los 22 minutos de la segunda parte.\n\nEn el alargue, "El Millonario" consiguió el título gracias a los goles de Juan Fernando Quintero y Gonzalo "Pity" Martínez.', inline: true },
                { name: "Resumen:", value: "https://www.youtube.com/watch?v=CQre9mRlPaQ" }
            )
            .setImage("https://www.infobae.com/new-resizer/HlNBO630d38T6fTa78hj5JXX0Oo=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/12/09193605/River-vs-Boca-Final-Copa-Libertadores-301.jpg")
            .setColor("YELLOW")
    }
} as ICommand;