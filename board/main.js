/*
    Endless dreaming
    Endless dreaming
    Everything else has no meaning
    I just wanna say that forever here I want to stay
    In endless dreaming
    Don't end this dreaming
*/

const postApiUrl = "https://eldritch.myic0n.netcraze.link/blogboard"

async function r(url, options) {
    let req = await fetch(url, options)
    if (req.ok) {
        let data = await req.json()
        return data
    } else {
        return {}
    }
}

async function getPosts() {
    let result = await r(`${postApiUrl}/index.json`)
    return result
}

function dateGetMonth(m) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m]
}

function getReadableDate(d) {
    return `${dateGetMonth(d.getMonth())} ${d.getDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`
}

function generatePost(p) {
    let block = $("<blockquote></blockquote>")
    let subtitle = $("<p></p>")
    let content = $("<span></span>")
    content.html(p.content)
    let postDate = new Date(p.timestamp)
    let pfp = ""
    if ('pic' in p.author) {
        pfp = `<img src="${p.author.pic}" class="post-pfp"></img>`
    }
    let subtitleText = `${pfp}${p.author.name}, ${getReadableDate(postDate)}`
    subtitle.addClass("post-subtitle")
    subtitle.html(subtitleText)
    block.append(subtitle)
    block.append(content)
    return block
}

async function loadPosts() {
    let flow = $("#posts")
    try {
        let response = await getPosts()
        flow.html("")
        for (let p of response.posts) {
            flow.append(generatePost(p))
        }
    } catch (error) {
        flow.html("")
        flow.append($(`<blockquote><p>Unable to load posts</p></blockquote>`))
    }

}

async function main() {
    await loadPosts()
}

addEventListener("DOMContentLoaded", main)