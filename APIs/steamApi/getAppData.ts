import fetch from "node-fetch"
import getAppList from "./getAppList"
import dotenv from "dotenv"
dotenv.config()

const banedIds = [980030]


const getAppData = async (param: string) => {
    const appsList = await getAppList()
    const finder = Number(param)

    if (`${finder}` == "NaN") {
        const appName = param.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g, '');
        let desiredAppList: any = []
        appsList.forEach((app: any) => {
            if (app.name.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g, '').includes(appName)) desiredAppList.push(app)
        })
        const sorted = desiredAppList.sort((obj: any, obj2: any) => { return obj.name.length - obj2.name.length });
        const app = sorted[0]
        if (!app || banedIds.includes(app.appid)) return app
        return getAppDetails(app)

    } else if (typeof finder == "number") {
        const app = appsList.find((app: { appid: number }) => app.appid == finder)
        if (!app) return app
        return getAppDetails(app)
    }
}

const getAppDetails = async (app: { appid: number }) => {
    const res = await fetch(`https://store.steampowered.com/api/appdetails?appids=${app.appid}&cc=ar`)
    const appData = await res.json()
    return {
        steam_appid: appData[app.appid].data.steam_appid,
        appName: appData[app.appid].data.name,
        is_free: appData[app.appid].data.is_free,
        price_initial: formatPrice(appData[app.appid].data.price_overview?.initial),
        price_final: formatPrice(appData[app.appid].data.price_overview?.final),
        realPrice: formatPrice((appData[app.appid].data.price_overview?.final * parseInt(process.env.IMPUESTOS!))),
        discount_percent: `${appData[app.appid].data.price_overview?.discount_percent}%`,
        short_description: appData[app.appid].data.short_description,
        img_url: appData[app.appid].data.header_image,
        store_url_explorer: `https://s.team/a/${appData[app.appid].data.steam_appid}`,
        store_url_app: `steam://store/${appData[app.appid].data.steam_appid}`,
        size: getAppSize(removeHTMLTags(appData[app.appid].data.pc_requirements.minimum)!),
    }
}

function removeHTMLTags(str: string) {
    if ((str === null) || (str === '')) {
        return
    }
    else {
        str = str.toString();
        return str.replace(/(<([^>]+)>)/ig, '  ')
    }
}

function getAppSize(pc_requirements_recommended: string) {
    const index = pc_requirements_recommended.indexOf('Storage:')
    if (index > 0) {
        const storage = pc_requirements_recommended.substr(index + 8, 8)
        return storage
    } else {
        return "No se encontró"
    }
}

const formatPrice = (price: number | null) => {
    const string = price?.toString()
    const formated = "ARS$ " + string?.slice(0, (string.length - 2)) + "," + (string)?.slice(string.length - 2);
    return formated
}

export default getAppData
