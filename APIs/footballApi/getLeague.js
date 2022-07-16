const fetch = require("node-fetch")

const getLeague = async (league, country) => {

    const res = await fetch(`https://v3.football.api-sports.io/leagues?name=${league}&country=${country}&current=true`, {
        "method" : "GET",
        "headers" : {
            'x-rapidapi-key': 'cc2d141a0928dc79db310b530a59760d',
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    });
    
    const data = await res.json()
    const leagueData = data.response[0]
    console.log(data)
    return leagueData
}

module.exports = getLeague