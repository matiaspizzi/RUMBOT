import fetch from "node-fetch";
import getAppList from "./getAppList.js"

const getAppData = async (appName) => {
    const appList = await getAppList()   
    const appNameLower = appName.toLowerCase()   
    const app = appList.app.find(app => app.name.toLowerCase() == `${appNameLower}`)
    if(!app){
        return app
    } else {
        console.log("producto encontrado")
        return getAppPrice(app)
    }
}

const getAppPrice = async (app) => {
    if(app.appid){
        const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${app.appid}&cc=ars`)
        const appData = await res.json()
        if(appData[app.appid].data.is_free == false){
            console.log(appData[app.appid].data.price_overview)
            return {
                appName: appData[app.appid].data.name,
                officialPrice: appData[app.appid].data.price_overview.final_formatted, 
                realPrice: formatRealPrice(appData[app.appid].data.price_overview.final)
            }
        } else {
            return false
        }
    }
}

const formatRealPrice = (price) => {
    price = (price * 1.65).toFixed(0)
    console.log(price)
    const string = price.toString()
    const formated = "ARS$ " + string.slice(0, (string.length - 2)) + "," + (string).slice(string.length - 2);
    return formated
}
export default getAppData
