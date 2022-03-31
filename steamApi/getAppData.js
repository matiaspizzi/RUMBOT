const fetch = require("node-fetch") 
const getAppList = require("./getAppList.js") 

const banedIds = [980030]
 

const getAppData = async (param) => {
    const appList = await getAppList() 
    const appid = Number(param)
    if(`${appid}` == "NaN"){
        const appNameLower = param.toLowerCase()
        const app = appList.find(app => app.name.toLowerCase() == `${appNameLower}` && !banedIds.includes(app.appid))
        if(!app){
            return app
        } else {
            return getAppDetails(app)
        }
    } else if (typeof appid == "number"){
        const app = appList.find(app => app.appid == appid && !banedIds.includes(app.appid))
        if(!app){
            return app
        } else {
            return getAppDetails(app)
        }
    }
}

const getAppDetails = async (app) => {
    if(app.appid){
        const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${app.appid}&cc=ar`)
        const appData = await res.json()
        if(appData[app.appid].data.price_overview){
            return {
                steam_appid: appData[app.appid].data.steam_appid,
                appName: appData[app.appid].data.name,
                is_free: appData[app.appid].data.is_free,
                price_initial:  formatPrice(appData[app.appid].data.price_overview.initial), 
                price_final:  formatPrice(appData[app.appid].data.price_overview.final), 
                realPrice:  formatPrice((appData[app.appid].data.price_overview.final * 1.65).toFixed(0)),
                discount_percent:  `${appData[app.appid].data.price_overview.discount_percent}%`,
                short_description: appData[app.appid].data.short_description,
                img_url: appData[app.appid].data.header_image,
                store_url_explorer: `https://s.team/a/${appData[app.appid].data.steam_appid}`,
                store_url_app: `steam://store/${appData[app.appid].data.steam_appid}`,
                size: getAppSize(removeHTMLTags(appData[app.appid].data.pc_requirements.minimum)),
            }
        } else if(appData[app.appid].data.is_free === true){
            return {
                steam_appid: appData[app.appid].data.steam_appid,
                appName: appData[app.appid].data.name,
                is_free: appData[app.appid].data.is_free,
                img_url: appData[app.appid].data.header_image,
                short_description: appData[app.appid].data.short_description,
                store_url_explorer: `https://s.team/a/${appData[app.appid].data.steam_appid}`,
                store_url_app: `steam://store/${appData[app.appid].data.steam_appid}`,
                size: getAppSize(removeHTMLTags(appData[app.appid].data.pc_requirements.minimum))
            }
        }
    }
}

function removeHTMLTags(str) {
    if ((str===null) || (str==='')){
        return false;
    }
    else{
        str = str.toString();
        return str.replace( /(<([^>]+)>)/ig, '  ')
    }
}

function getAppSize(pc_requirements_recommended){
    const index = pc_requirements_recommended.indexOf('Storage:')
    if(index > 0){
        const storage = pc_requirements_recommended.substr(index+8, 8)
        return storage
    } else {
        return "No se encontró"
    }
}

const formatPrice = (price) => {
    const string = price.toString()
    const formated = "ARS$ " + string.slice(0, (string.length - 2)) + "," + (string).slice(string.length - 2);
    return formated
}

module.exports = getAppData
