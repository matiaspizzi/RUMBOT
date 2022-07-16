const {MessageEmbed} = require("discord.js") 
const getPositions = require("../footballApi/getPositions.js") 
const getLeague = require("../footballApi/getLeague.js")

module.exports = {  
    description: "Get data of a football team.",
    slash: false,
    category: "Football",

    callback: async ({text}) => {
        if(text){
            const comaIndex = text.indexOf(",")
            const league = text.substring(0, comaIndex).trim()
            const country = text.substring(comaIndex + 1).trim()
            // const leagueData = await getLeague(league, country)
            // console.log(leagueData)
            // if (!leagueData){
            //     return new MessageEmbed()
            //     .setTitle(`No se encontró la liga "${league}"  :x:`)
            //     .setColor("RED")
            // } else if(leagueData.league.id > 0){
                const positionsData = await getPositions()//leagueData.id)
                const groupA = []
                positionsData[0].forEach(element => { groupA.push({name: element.team.name, points: element.points}) })
                const groupB = []
                positionsData[1].forEach(element => { groupB.push({name: element.team.name, points: element.points}) })
                console.log(positionsData)
                return new MessageEmbed()
                    // .setTitle(`:sparkles: ${leagueData.league.name}, ${leagueData.country.name}`)
                    .setColor("GREEN")
                    // .setThumbnail(leagueData.league.logo)
                    .setFields(
                        {name : ":sparkles: Grupo A:", value :  `---------------------------\n **1°**\t\t - Team: **${groupA[0].name}**  / Points: **${groupA[0].points}** \n **2°**\t\t - Team: **${groupA[1].name}**  / Points: **${groupA[1].points}** \n **3°**\t\t - Team: **${groupA[2].name}**    / Points: **${groupA[2].points}** \n **4°**\t\t - Team: **${groupA[3].name}**    / Points: **${groupA[3].points}** \n---------------------------\n **5°**\t\t - Team: **${groupA[4].name}**    / Points: **${groupA[4].points}** \n **6°**\t\t - Team: **${groupA[5].name}**    / Points: **${groupA[5].points}** \n **7°**\t\t - Team: **${groupA[6].name}**    / Points: **${groupA[6].points}** \n **8°**\t\t - Team: **${groupA[7].name}**    / Points: **${groupA[7].points}** \n **9°**\t\t - Team: **${groupA[8].name}**    / Points: **${groupA[8].points}** \n **10°**\t\t - Team: **${groupA[9].name}**    / Points: **${groupA[9].points}** \n **11°**\t\t - Team: **${groupA[10].name}**    / Points: **${groupA[10].points}** \n **12°**\t\t - Team: **${groupA[11].name}**    / Points: **${groupA[11].points}** \n **13°**\t\t - Team: **${groupA[12].name}**    / Points: **${groupA[12].points}** \n **14°**\t\t - Team: **${groupA[13].name}**    / Points: **${groupA[13].points}**`, inline: false}, 
                        {name : ":sparkles: Grupo B:", value :  `---------------------------\n **1°**\t\t - Team: **${groupB[0].name}**  / Points: **${groupB[0].points}** \n **2°**\t\t - Team: **${groupB[1].name}**  / Points: **${groupB[1].points}** \n **3°**\t\t - Team: **${groupB[2].name}**    / Points: **${groupB[2].points}** \n **4°**\t\t - Team: **${groupB[3].name}**    / Points: **${groupB[3].points}** \n---------------------------\n **5°**\t\t - Team: **${groupB[4].name}**    / Points: **${groupB[4].points}** \n **6°**\t\t - Team: **${groupB[5].name}**    / Points: **${groupB[5].points}** \n **7°**\t\t - Team: **${groupB[6].name}**    / Points: **${groupB[6].points}** \n **8°**\t\t - Team: **${groupB[7].name}**    / Points: **${groupB[7].points}** \n **9°**\t\t - Team: **${groupB[8].name}**    / Points: **${groupB[8].points}** \n **10°**\t\t - Team: **${groupB[9].name}**    / Points: **${groupB[9].points}** \n **11°**\t\t - Team: **${groupB[10].name}**    / Points: **${groupB[10].points}** \n **12°**\t\t - Team: **${groupB[11].name}**    / Points: **${groupB[11].points}** \n **13°**\t\t - Team: **${groupB[12].name}**    / Points: **${groupB[12].points}** \n **14°**\t\t - Team: **${groupB[13].name}**    / Points: **${groupB[13].points}**`, inline: true}, 
                    )
                    .setFooter({text: "Si no funciona correctamente, por favor avisar en !soporte"})
            }
        // } else {
        //     return new MessageEmbed()
        //         .setTitle(`**Por favor, escriba un parámetro válido.**`)
        //         .setFields(
        //             {name : "Entre ellos:", value : "Nombres de equipos: _River Plate_ \nPaís de origen: _Argentina_"},
        //             {name : "Forma de usar el comando:", value : "!football <parámetro>, <parámetro>"},
        //             {name : "Ejemplos:", value : "!football River Plate, Argentina"},
        //         )
        //         .setFooter({text: "Si no funciona correctamente, por favor avisar en !soporte"})
        //         .setColor("RED")
        // }
    }
}