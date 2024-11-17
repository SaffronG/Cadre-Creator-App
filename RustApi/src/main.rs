#[macro_use] extern crate rocket;

use std::{fs, path, vec};
use rocket::{fs::NamedFile, http::ext::IntoCollection};
use RustApi::List;
use serde_json::{Result, value};
use serde::{Deserialize};
mod json_handler;

#[derive(Deserialize, Debug)]
struct Faction {
    faction: String,
    detachments: Vec<String>
}

#[get("/")]
async fn json_schema() -> NamedFile {
    NamedFile::open("schema.html").await.unwrap()
}

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
            out += &path.as_ref().unwrap().file_name().to_str().unwrap()[0..path.as_ref().unwrap().file_name().len()-5];
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/<faction>")]
fn get_faction(faction: &str) -> String {
    fs::read_to_string(&format!("{}\\factions\\{}.json", std::env::current_dir().unwrap().display() ,faction)).unwrap()
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
fn get_list(name:String) -> String {
    fs::read_to_string(&format!("{}\\lists\\{}.json", std::env::current_dir().unwrap().display() , name)).unwrap()
}

#[get("/<model>")]
fn get_model(model: String) -> String {
    fs::read_to_string(&format!("{}\\models\\{}.json", std::env::current_dir().unwrap().display() , model)).unwrap()
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![json_schema, get_factions_list, get_lists, get_list])
        .mount("/factions", routes![get_faction])
        .mount("/models", routes![get_model])
}