#[macro_use] extern crate rocket;

use std::{fs, vec};
use RustApi::List;
use rocket::serde::{Deserialize ,Serialize};
use rocket_contrib::json::Json;
mod json_handler;

#[get("/factions")]
fn get_factions_list() -> String {
    if !fs::exists("./factions").unwrap()
    {
        fs::create_dir("./factions").unwrap();
    }
    let mut out = String::new();
    out += "{\"Factions\":[";
    for path in fs::read_dir("./factions").unwrap() {
        if let Ok(ref _entry) = path {
            out += "\"";
            out += &path.unwrap().file_name().to_str().unwrap();
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/factions/<faction>/<detachment>")]
fn get_detachment(faction: &str, detachment: &str) -> String {
    if !fs::exists("./detachments").unwrap()
    {
        fs::create_dir("./detachments").unwrap();
    }
    let mut out = String::new();
    out += "{\"Detachment\":[";
    for path in fs::read_dir("./detachments").unwrap() {
        if let Ok(ref _entry) = path {
            out += "\"";
            out += &path.unwrap().file_name().to_str().unwrap();
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/lists")]
fn get_lists() -> String {
    if !fs::exists("./lists").unwrap()
    {
        fs::create_dir("./lists").unwrap();
    }
    let mut out = String::new();
    out += "{\"lists\":[";
    for path in fs::read_dir("./lists").unwrap() {
        if let Ok(ref _entry) = path {
            out += "\"";
            out += &path.as_ref().unwrap().file_name().to_str().unwrap()[0..path.as_ref().unwrap().file_name().len()-5];
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/lists/<name>")]
fn get_list(name:String, response: String) -> Json<List> {
    if !fs::exists("./lists").unwrap()
    {
        fs::create_dir("./lists").unwrap();
    }
    rocket_contrib::json::Json(fs::read_to_string(format!("/lists{}", name)))
}

#[post("/lists", data = "<new_list>")]
async fn post_list(new_list: List) -> &'static str {
    json_handler::file_out(List::build(
        "Greenskin Killer Squad".to_string(),
        "Kauyon".to_string(),
        3000,
        [
            "\"Commander Shadowsun\": \"http://127.0.0.1:8000/models/commander_shadowsun.json\"".to_string(),
            "\"Commander in Enforcer Battlesuit\": \"http://127.0.0.1:8000/models/enforcer_commander.json\"".to_string(),
            "\"Commander in Coldstar Battlesuit\": \"http://127.0.0.1:8000/models/coldstar_commander.json\"".to_string()
        ].to_vec(),
    ), format!("/lists/{}.json", new_list.name)).await.unwrap();
    "200 ok"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![get_factions_list, get_detachment, get_lists,get_list, post_list])
}