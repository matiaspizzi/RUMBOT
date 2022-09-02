import fetch from "node-fetch"

const getAppList = async () => {
    const res = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json`)
    const appList = await res.json()
    return appList.applist.apps
}

export default getAppList