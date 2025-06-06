var search = location.search.substring(1);
var params

async function r(url, p) {
    let req = await fetch(url, p)
    if (req.ok) {
        let data = await req.json()
        return data
    } else {
        return {}
    }
}

if (location.search) {
    params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
} else {
    params = {}
}

var langs = {}

var currentPage = 0
var pageImg = $("#image")
var pageContent = $("#content")
var pageDate = $("#date")

function getUserLang() {
    if ("lang" in params) {
        return params.lang
    } else {
        return navigator.language.split('-')[0]
    }
}

async function loadLang(langCode) {
    let langData = await r(`../assets/langs/${langCode}.json`)
    if (langData != {}) {
        langs[langCode] = langData
        for (let page of langData) {
            let preload = document.createElement("link")
            preload.href = `../assets/${page.img}`
            preload.rel = 'preload'
            preload.as = 'image'
            document.head.appendChild(preload)
        }
        return true
    } else {
        return false
    }
}

async function loadUserLang() {
    let langCode = getUserLang()
    let loaded = await loadLang(langCode)
    if (loaded) {
        console.log(`Loaded lang: ${loaded}`)
        return true
    } else {
        return false
    }
}

function tr(k) {
    let userLang = getUserLang()
    let l = langs[userLang]
    return l[k]
}

function showPage(k) {
    console.log(`Showing page: ${k}`)
    let page = tr(k)
    if ("text" in page) {
        pageContent.html("")
        pageContent[0].scrollTo(0, 0)
        let content = ""
        for (let line of page.text.split('\n')) {
            content += `<p class="textbox-line">${line}</p>`
        }
        pageContent.html(content)
    } else {
        pageContent.html("")
    }
    if ("img" in page) {
        pageImg.attr("src", `../assets/${page.img}`)
    }
    if ("date" in page) {
        pageDate.text(page.date)
    }

    if (currentPage < 1) {
        $("#backbtn").prop("disabled", true)
    } else {
        $("#backbtn").prop("disabled", false)
    }
    if (currentPage >= langs[getUserLang()].length - 1) {
        $("#nextbtn").prop("disabled", true)
    } else {
        $("#nextbtn").prop("disabled", false)
    }
}

async function main() {
    await loadUserLang()
    $("#backbtn").on("click", function () {
        currentPage -= 1
        showPage(currentPage)
    })
    $("#nextbtn").on("click", function () {
        currentPage += 1
        showPage(currentPage)
    })
    showPage(currentPage)
}

addEventListener("DOMContentLoaded", main)