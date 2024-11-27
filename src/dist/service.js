export async function get_headers() {
    let response = await fetch("http://127.0.0.1:8000/lists");
    return await response.json();
}
export async function get_list(name) {
    let response = await fetch(`http://127.0.0.1:8000/lists/${name}`);
    return await response.json();
}
export async function post_list(data) {
    await fetch('http://127.0.0.1:8000/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Name": data.name,
            "Detachment": data.detachment,
            "Points": Number(data.points),
            "Models": data.models
        })
    });
}
export async function get_profile(name) {
    const response = await fetch(`http://127.0.0.1:8000/profiles/${name}`);
    return await response.json();
}
export async function get_rule(rule) {
    const response = await fetch(`http://127.0.0.1:8000/rules/${rule}`);
    return await response.json();
}
export async function get_rules() {
    const response = await fetch(`http://127.0.0.1:8000/rules`);
    return await response.json();
}
//# sourceMappingURL=service.js.map