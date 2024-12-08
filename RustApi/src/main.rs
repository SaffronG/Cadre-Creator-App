#[macro_use] extern crate rocket;

use std::{fs, path::Path, vec};
use rocket::fs::NamedFile;
// use serde_json::{Result, value};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
#[allow(non_snake_case)]
struct List {
    Name: String,
    Detachment: String,
    Points: u32,
    Models: Vec<String>,
}

pub struct CORS;
#[rocket::async_trait]
impl rocket::fairing::Fairing for CORS {
    fn info(&self) -> rocket::fairing::Info {
        rocket::fairing::Info {
            name: "Add CORS headers to responses",
            kind: rocket::fairing::Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r rocket::Request<'_>, response: &mut rocket::Response<'r>) {
        response.set_header(rocket::http::Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(rocket::http::Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS, PUT"));
        response.set_header(rocket::http::Header::new("Allow", "POST, GET, PATCH, OPTIONS, PUT"));
        response.set_header(rocket::http::Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(rocket::http::Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

// GET REQUESTS
#[get("/")]
async fn json_schema() -> Result<NamedFile, std::io::Error> {
    NamedFile::open("schema.html").await
}

// READ ALL AVAILABLE FILES

#[get("/")]
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

#[get("/")]
fn get_profiles() -> String {
    if !fs::exists("./configs").unwrap()
    {
        fs::create_dir("./configs").unwrap();
    }
    let mut out = String::new();
    out += "{\"Settings-Configs\":[";
    for path in fs::read_dir("./configs").unwrap() {
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
fn get_faction(faction: &str) -> Result<String, std::io::Error> {
    fs::read_to_string(&format!("{}/factions/{}.json", std::env::current_dir().unwrap().display() ,faction))
}

#[get("/")]
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

#[get("/")]
fn get_rules() -> String {
    if !fs::exists("./rules").unwrap()
    {
        fs::create_dir("./rules").unwrap();
    }
    let mut out = String::new();
    out += "{\"lists\":[";
    for path in fs::read_dir("./rules").unwrap() {
        if let Ok(ref _entry) = path {
            out += "\"";
            out += &path.as_ref().unwrap().file_name().to_str().unwrap()[0..path.as_ref().unwrap().file_name().len()-5];
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}

#[get("/")]
fn get_models() -> String {
    if !fs::exists("./models").unwrap()
    {
        fs::create_dir("./models").unwrap();
    }
    let mut out = String::new();
    out += "{\"lists\":[";
    for path in fs::read_dir("./models").unwrap() {
        if let Ok(ref _entry) = path {
            out += "\"";
            out += &path.as_ref().unwrap().file_name().to_str().unwrap()[0..path.as_ref().unwrap().file_name().len()-5];
            out += "\","
        }
    }
    out = out[0..(out.len()-1)].to_string() + "]}";
    out
}


// SERVE SPECIFIC FILES

#[get("/<name>")]
fn get_list(name:String) -> Result<String, std::io::Error> {
    fs::read_to_string(Path::new(&format!("{}/lists/{}.json", std::env::current_dir().unwrap().display(), name)))
}

#[get("/<model>")]
fn get_model(model: String) -> Result<String, std::io::Error> {
    fs::read_to_string(&format!("{}/models/{}.json", std::env::current_dir().unwrap().display() , model))
}

#[get("/<profile>")]
fn get_profile(profile: String) -> Result<String, std::io::Error> {
    fs::read_to_string(&format!("./configs/{}.json", profile))
}

#[get("/<rule>")]
fn get_rule(rule: String) -> Result<String, std::io::Error> {
    fs::read_to_string(&format!("{}/rules/{}.json",std::env::current_dir().unwrap().display(), rule))
}

// OPTIONS HANDLERS

#[rocket::options("/")]
fn cors_post_handler() {
}

// POST REQUESTS

#[post("/", format = "json", data = "<new_list>")]
fn post_list(new_list: rocket::serde::json::Json<List>) -> Result<&'static str, std::io::Error> {
    // Get the file name and serialize the struct into JSON \\
    let filename = format!("./lists/{}.json", &new_list.Name);
    let serialized = serde_json::to_string(&new_list.into_inner()).unwrap();
    match fs::write(filename, serialized) {
        Ok(()) => Ok("File submitted successfully!"),
        e => Err(std::io::Error::new(std::io::ErrorKind::Other, format!("{:?}", e)))
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .configure(rocket::Config::figment().merge(("port", 8000)))
        .mount("/", routes![json_schema]) // SEND THE API SCHEMA TO THE USER
        .mount("/lists", routes![get_list, get_lists, post_list, cors_post_handler])
        .mount("/factions", routes![get_faction, get_factions_list])
        .mount("/models", routes![get_model, get_models])
        .mount("/profiles", routes![get_profiles, get_profile])
        .mount("/rules", routes![get_rules, get_rule])
}