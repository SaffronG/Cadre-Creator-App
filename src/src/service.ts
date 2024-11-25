export async function get_headers() {
    let response = await fetch("http://127.0.0.1:8000/lists");
    return await response.json();
}

export async function get_list(name: string) {
    let response = await fetch(`http://127.0.0.1:8000/lists/${name}`)
    return await response.json()
}

export async function post_list(name: string, data) {
    await fetch('http://127.0.0.1:8000/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Name": "Comp list",
            "Detachment": "Mont'Ka",
            "Points": 1000,
            "Models": ["Ethereal", "Commander Shadowsun"]
        })
    })
}

export async function get_profile(name: string) {
    const response = await fetch(`http://127.0.0.1:8000/profiles/${name}`)
    return await response.json()
}

export async function get_rule(rule: string) {
    const response = await fetch(`http://127.0.0.1:8000/rules/${rule}`)
    return await response.json()
}

export async function get_rules() {
    const response = await fetch(`http://127.0.0.1:8000/rules`)
    return await response.json()
}