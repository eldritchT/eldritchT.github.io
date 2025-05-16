function geturl() {
    /* if (window.location.host == "[21d:743f:25ef:4be4:5f96:9ef5:d67a:ce55]") {
        return "http://[216:8083:8972:3cd6:df5d:e631:8d58:9376]"
    } else {
        return "https://media-api.tgtube.ru"
    } */
   return "https://eldritch.myic0n.netcraze.link/api/media"
}

async function showPlaying(output) {
    let d = await jhr(`${geturl()}/lfm/user/now_playing?username=nee96`)
    let status
    if (d) {
        if (d.response.is_playing) {
            status = "Right now I'm listening to"
        } else {
            status = "Last time I listened to"
        }
        output.innerHTML = `${status}<br><a href=\'${d.response.url}\'><b>${d.response.artist} - ${d.response.title}</b></a>`
    } else {
        output.innerHTML = `Some kind of error has occured when fetching data.`
    }
}
