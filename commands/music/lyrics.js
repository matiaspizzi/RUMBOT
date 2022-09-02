import { MessageEmbed } from 'discord.js';
const lyricsParse = require("lyrics-finder");

export default {
	description: "Muestra la letra de la canción actual",
	slash: "both",
	category: "Audio",

	callback: async ({ message }) => {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return new MessageEmbed()
			.setDescription(`Actualmente no se esta reproduciendo música`)

		try {
			const songNameFormated = queue.current.title
				.toLowerCase()
				.replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")

			let lyrics = await lyricsParse(songNameFormated, queue.current.author) || "Not Found!";

			if (lyrics.length) {
				return new MessageEmbed()
					.setTitle(`**${queue.current.title}** - ${queue.current.author}`)
					.setDescription(`${lyrics}`)
					.setTimestamp()
					.setFooter({ text: `${message.member.displayName}`, iconURL: message.author.displayAvatarURL() })
			} else if (!lyrics.length) {
				return new MessageEmbed()
					.setDescription(`No se encontró la letra de **${queue.current.title}**`)
			}

		} catch (e) {
			console.log(e);
			return new MessageEmbed()
				.setDescription(`Ocurrió un error buscando la letra de **${queue.current.title}**`)
		}
	}
}