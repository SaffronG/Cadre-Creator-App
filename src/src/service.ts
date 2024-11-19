export async function get_headers() {
    let response = await fetch("http://127.0.0.1:8000/lists");
    return await response.json();
}

export async function get_list(name: string) {
    console.log(name)
    let response = await fetch(`http://127.0.0.1:8000/lists/${name}`)
    return await response.json()
}