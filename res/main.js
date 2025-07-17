async function main() {
    let np = $("#nowPlaying")
    np.text("Fetching info...")
    let req = await NowPlaying.get("nee96")
    let reqStatus = req.status
    let response = req.response
    console.log(response)
    if (response) {
        if (reqStatus) {
            let text = ""
            if (response.is_playing) {
                text += "Right now I am listening to<br />"
            } else {
                text += "Last time I was listening to<br />"
            }
            text += `<a href="${response.url}"><b>${response.artist} - ${response.title}</b></a>`
            np.html(text)
        } else {
        np.html("<b>Status error</b>")
    }
    } else {
        np.html("<b>Error</b>")
    }
}

addEventListener("DOMContentLoaded", main())