import fetch from "node-fetch";

const getAppList = async () => {
    const res = await fetch(`http://api.steampowered.com/ISteamApps/GetAppList/v0001/`)
    const appList = await res.json()
    console.log(`Lista recivida`)
    return appList.applist.apps
}

export default getAppList