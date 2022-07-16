const fetch = require("node-fetch")

const getTeam = async (team, country) => {
    
    const res = await fetch(`https://v3.football.api-sports.io/teams/statistics?name=${team}&country=${country}`, {
        "method" : "GET",
        "headers" : {
            'x-rapidapi-key': 'cc2d141a0928dc79db310b530a59760d',
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });
    
    const data = await res.json()
    console.log(data)
    return data
}

module.exports = getTeam