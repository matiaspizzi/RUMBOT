const { MessageEmbed } = require("discord.js")
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {  
    description: "Indique persona y audio para reproducir.",
    slash: "both",
    category: "Audio",

    callback: async ({client, message, text}) => {   

        const audioResources  = require("../audioResources");
        const comaIndex = text.indexOf(",")
        const personaName = text.substring(0, comaIndex).trim()
        const audioName = text.substring(comaIndex + 1).trim()
        let resource = null

        const getAudio = (audioName, personaName) => {
            const persona = audioResources.find(e => e.nombre.toLocaleLowerCase() == personaName.toLocaleLowerCase())
            if(!persona){
                return resource
            }
            const audioFound = persona.audios.find(e => e.nombre.toLocaleLowerCase() == audioName.toLocaleLowerCase())
            if(!audioFound){
                return resource
            }
            resource = audioFound.url
            return resource
        }

        getAudio(audioName, personaName)
        
        const playAudio = (channel, audio) => {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guildId,
                adapterCreator: channel.guild.voiceAdapterCreator
            })
        
            const player = createAudioPlayer();
        
            player.play(audio);
        
            connection.subscribe(player);
        
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });
        }
        
        const guild = client.guilds.cache.get(message.guildId);
        const member = guild.members.cache.get(message.author.id);
        const channel = member.voice.channel;
            
        if (channel === null) return new MessageEmbed()
            .setTitle(`:x: No se encontró el canal de voz.`)
            .setDescription(`Para poder usar este comando debes estar en un canal de voz.`)
            .setColor("RED")
        
        if (resource === null) {
            return new MessageEmbed()
                .setTitle(`:x: No se encontró el audio "${text}" \n Por favor, escriba un parámetro válido.`)
                .setDescription(`**Forma de usar el comando:** \n rb audio <nombre>, <audio>\n \n __**Lista de audios**__:`)
                .setColor("RED")
                .setFields(
                    { name: `:small_blue_diamond: ${audioResources[0].nombre}:`, value: ` ${audioResources[0].audios[0].nombre} \n ${audioResources[0].audios[1].nombre} \n  ${audioResources[0].audios[2].nombre} \n  ${audioResources[0].audios[3].nombre} \n -----------------------------`, inline: false },
                    { name: `:small_blue_diamond: ${audioResources[1].nombre}:`, value: ` ${audioResources[1].audios[0].nombre} \n -----------------------------`, inline: false },
                    { name: `:small_blue_diamond: ${audioResources[2].nombre}:`, value: ` ${audioResources[2].audios[0].nombre} \n -----------------------------`, inline: false },
                    { name: `:small_blue_diamond: ${audioResources[3].nombre}:`, value: ` ${audioResources[3].audios[0].nombre} \n -----------------------------`, inline: false },
                    { name: `:small_blue_diamond: ${audioResources[4].nombre}:`, value: ` ${audioResources[4].audios[0].nombre} \n ${audioResources[4].audios[1].nombre} \n -----------------------------`, inline: false },
                )
                .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
        }
        
        return playAudio(channel, createAudioResource(resource)); 
    }
}