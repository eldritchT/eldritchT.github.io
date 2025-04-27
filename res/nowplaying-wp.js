function geturl() {
    if (window.location.host == "[21d:743f:25ef:4be4:5f96:9ef5:d67a:ce55]") {
        return "http://[216:8083:8972:3cd6:df5d:e631:8d58:9376]"
    } else {
        return "https://media-api.tgtube.ru"
    }
}

async function showPlaying(output) {
    output.textContent = `Получение данных...`
    let d = await jhr(`${geturl()}/lfm/user/now_playing?username=nee96`)
    let status
    if (d) {
        if (d.response.is_playing) {
            status = "Сейчас я слушаю"
        } else {
            status = "Последний раз я слушал"
        }
        output.textContent = `${status} <a href=\'${d.response.url}\'><b>${d.response.artist} - ${d.response.title}</b></a>`
    } else {
        output.textContent = `Ошибка получения данных.`
    }
}
