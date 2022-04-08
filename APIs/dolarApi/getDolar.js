const fetch = require("node-fetch")

const getDolar = async () => {

    const get = ["dolaroficial", "dolarblue", "contadoliqui", "dolarpromedio", "dolarturista", "dolarbolsa", "mayorista", "bcra/reservas","riesgopais"]
    let dolarData = []
    for(const elem of get){
        const res = await fetch(`https://api-dolar-argentina.herokuapp.com/api/`+elem)
        const data = await res.json()
        if(data.compra && data.compra != "No cotiza") data.compra = "$" + data.compra
        data.venta = "$" + data.venta
        dolarData.push(data)
    }
    return dolarData
}

module.exports = getDolar