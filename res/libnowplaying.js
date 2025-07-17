function NowPlaying() { throw new Error("thats a static class") }

NowPlaying.apiUrl = "/api/media"

NowPlaying._jsonFetch = async function (fetchUrl, fetchOptions) {
    let f = await fetch(fetchUrl, fetchOptions)
    if (f.ok) {
        let data = await f.json()
        return data
    }
}

NowPlaying.get = async function (username) {
    let result = this._jsonFetch(`${this.apiUrl}/lfm/user/now_playing?username=${username}`)
    if (result) {
        return result
    }
}