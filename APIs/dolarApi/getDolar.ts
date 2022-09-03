import fetch from 'node-fetch'
import convert from 'xml-js'

const getDolar = async () => {

    let dolarData: any = await fetch("https://www.dolarsi.com/api/dolarSiInfo.xml")
    dolarData = await dolarData.text()
    dolarData = convert.xml2json(dolarData, {compact: true, spaces: 4})
    dolarData = JSON.parse(dolarData)
    const valores = []                           
    const cotiza = dolarData.cotiza
    valores.push(cotiza.valores_principales.casa349, cotiza.valores_principales.casa310, cotiza.valores_principales.casa312, cotiza.valores_principales.casa313, cotiza.valores_principales.casa406, cotiza.Dolar.casa44, cotiza.Riesgo_pais.casa141, cotiza.Reservas_y_circulante.casa394, cotiza.Reservas_y_circulante.casa395, dolarData.cotiza.ultima.zona1)
    return valores

}

export default getDolar