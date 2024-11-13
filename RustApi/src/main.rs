#[macro_use] extern crate rocket;

use std::{fs, string, vec};
// #[derive(Deserialize)]
// #[serde(crate = "rocket::serde")]
// struct Task<'r> {
//     description: &'r str,
//     detachements: Vec<&'r str>
// }

#[get("/factions")]
fn get_factions_list() -> String {
    if !fs::exists("./factions").unwrap()
    {
        fs::create_dir("./factions").unwrap();
    }
    let mut out = String::new();
    out += "{\"Factions\":[";
    for path in fs::read_dir("./factions").unwrap() {
        if let Ok(ref entry) = path {
            out += "\"";
            out += &path.unwrap().file_name().to_str().unwrap();
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/factions/<faction>/<detachment>")]
fn get_detachment(faction: String, detachment: String) -> String {
    if !fs::exists("./detachments").unwrap()
    {
        fs::create_dir("./detachments").unwrap();
    }
    let mut out = String::new();
    out += "{\"Detachment\":[";
    for path in fs::read_dir("./detachments").unwrap() {
        if let Ok(ref entry) = path {
            out += "\"";
            out += &path.unwrap().file_name().to_str().unwrap();
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

// #[post("/factions/<id>", data = "<task>")]
// fn new_faction(task: Json<Task<'_>>, id: u32) {

// }

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![get_factions_list,get_detachment])
}