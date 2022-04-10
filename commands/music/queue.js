const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Muestra la cola de reproducción",
    slash: "both",
    category: "Audio",

    callback: async ({ message, text }) => {
        const pagina = text || 0
        const queue = player.getQueue(message.guild.id)
        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`No hay canciones en la cola de reproduccion`)
            .setColor("RED")

        const totalPaginas = Math.ceil(queue.tracks.length / 10) || 1

        if (pagina > totalPaginas) return new MessageEmbed()
            .setDescription(`Página invalida. El total de páginas es ${totalPaginas}`)
            .setColor("RED")
        
        const queueString = queue.tracks.slice(pagina * 10, pagina * 10 + 10).map((song, i) => {
            return `**${pagina * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        return new MessageEmbed()
            .setDescription(`**Reproduciendo**\n` + (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "Ninguna") + `\n\n**Cola**\n${queueString}`)
            .setFooter({text: `Página ${pagina + 1} de ${totalPaginas}`})
            .setThumbnail(currentSong.setThumbnail)
    }
}