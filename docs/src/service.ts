const webroot = "https://wh40kserver1-yzbcrd1s.b4a.run/";

export async function get_headers() {
    let response = await fetch(`${webroot}/lists`);
    return await response.json();
}

export async function get_list(name: string) {
    let response = await fetch(`${webroot}/${name}`)
    return await response.json()
}

export async function post_list(data) {
    console.log(data)
    await fetch(`${webroot}/lists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Name: data.Name,
            Detachment: data.Detachment.toLowerCase(),
            Points: data.Points,
            Models: data.Models
        })
    })
}

export async function get_profile(name: string) {
    const response = await fetch(`${webroot}/profiles/${name}`)
    return await response.json()
}

export async function get_rule(rule: string) {
    const response = await fetch(`${webroot}/rules/${rule}`)
    return await response.json()
}

export async function get_rules() {
    const response = await fetch(`${webroot}/rules`)
    return await response.json()
}

export async function get_factions() {
    const response = await fetch(`${webroot}/factions`)
    return await response.json()
}

export async function get_img (model: String) {
    const response = await fetch(`${webroot}/models/${model}`)
    const json = await response.json()
    return json.image
}