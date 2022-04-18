const { MessageEmbed } = require("discord.js")

module.exports = {
    description: "Muestra la canción actual",
    slash: "both",
    category: "Audio",

    callback: async ({ message }) => {
        const queue = player.getQueue(message.guild.id)

        if (!queue || !queue.playing) return new MessageEmbed()
            .setDescription(`Actualmente no se esta reproduciendo música`)

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return new MessageEmbed()
            .setDescription(`Reproduciendo | **[${queue.current.title}](${queue.current.url})** (\`${perc.progress == 'Infinity' ? 'Live' : perc.progress + '%'}\`) \n ${progress.replace(/ 0:00/g, ' ◉ LIVE')}`)
    }
}