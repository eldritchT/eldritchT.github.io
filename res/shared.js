$ = (x) => { return document.getElementById(x) }

async function jhr(u, p) {
    let r = await fetch(u, p)
    if (r.ok) {
        return await r.json()
    }    
}