/*
    Endless dreaming
    Endless dreaming
    Everything else has no meaning
    I just wanna say that forever here I want to stay
    In endless dreaming
    Don't end this dreaming
*/

const postApiUrl = "https://eldritch.myic0n.netcraze.link/blogboard"
var blogData

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
    if (blogData) {
        return blogData
    }
    let result = await r(`${postApiUrl}/index.json`)
    blogData = result
    return result
}

function dateGetMonth(m) {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m]
}

function getReadableDate(d) {
    return `${dateGetMonth(d.getUTCMonth())} ${d.getUTCDate()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`
}

function truncateStringAtWord(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    let truncated = str.slice(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
        return truncated + "..";
    }
    return truncated.slice(0, lastSpaceIndex) + "..";
}

function generatePost(p, idx, brief) {
    let block = $(`<blockquote></blockquote>`)
    let subtitle = $("<p></p>")
    let content = $("<span></span>")
    if (brief) {
        p.content = truncateStringAtWord(p.content, 20)
    }
    content.html(p.content)
    let postDate = new Date(p.timestamp)
    let pfp = ""
    if ('pic' in p.author) {
        pfp = `<img src="${p.author.pic}" class="post-pfp"></img>`
    }
    let subtitleText = `<a href='#p${idx}'>${pfp}${p.author.name}, ${getReadableDate(postDate)} #${idx}</a>`
    subtitle.addClass("post-subtitle")
    subtitle.html(subtitleText)
    block.append(subtitle)
    if (!brief) {
        if ('linkedPost' in p) {
            let linkedPost = blogData.posts[p.linkedPost]
            block.append(generatePost(linkedPost, p.linkedPost, true))
        }
    }
    content.addClass("post-content")
    block.append(content)
    block.attr("id", `p${idx}`)
    return block
}

async function loadPosts() {
    let flow = $("#posts")
    let banner = $("#banner")
    try {
        let response = await getPosts()
        if ('meta' in response) {
            if ('banner' in response.meta) {
                banner.html(response.meta.banner)
            } else {
                banner.attr("hidden", true)
            }
        }
        flow.html("")
        for (let p of response.posts) {
            let generatedPost = generatePost(p, response.posts.indexOf(p))
            if (generatedPost) {
                flow.append(generatedPost)
            }
        }
    } catch (error) {
        flow.html("")
        console.log(error)
        flow.append($(`<blockquote><p>Unable to load posts</p></blockquote>`))
    }

}

async function main() {
    await loadPosts()
}

addEventListener("DOMContentLoaded", main)