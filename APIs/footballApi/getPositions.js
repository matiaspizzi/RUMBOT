const fetch = require("node-fetch")
const fs = require('fs')

const getPositions = async (leagueId) => {

    // const season = new Date().getFullYear()
    // leagueId = 128 

    // const res = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, {
    //     "method" : "GET",
    //     "headers" : {
    //         'x-rapidapi-key': 'cc2d141a0928dc79db310b530a59760d',
    //         'x-rapidapi-host': 'v3.football.api-sports.io'
    //     }
    // });

    // const res = await fetch(`../data/positions.json`)    
    // const data = await res.json()

    const rawdata = fs.readFileSync('C:/Users/matia/Desktop/RUMBOT/data/positions.json')
    // const positions = data.response[0].league.standings

    const positions = JSON.parse(rawdata)
    console.log(positions)
    return positions
}

module.exports = getPositions