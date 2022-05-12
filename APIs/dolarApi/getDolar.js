const fetch = require("node-fetch")

const getDolar = async () => {

    const get = ["dolaroficial", "dolarblue", "contadoliqui", "dolarpromedio", "dolarturista", "dolarbolsa", "mayorista", "bcra/reservas","riesgopais"]
    let dolarData = []
    for(const elem of get){
        const res = await fetch(`https://api-dolar-argentina.herokuapp.com/api/`+elem)
        if(res.status === 404){
            const data = {
                fecha: "Sin datos",
                compra: "Sin datos",
                venta: "Sin datos",
            }
            dolarData.push(data)
        } else {
            const data = await res.json()
            if(data.compra && data.compra != "No cotiza") data.compra = "$" + data.compra
            if(data.venta){
                data.venta = "$" + data.venta
            }
            dolarData.push(data)
        }
    }
    return dolarData
}

module.exports = getDolar