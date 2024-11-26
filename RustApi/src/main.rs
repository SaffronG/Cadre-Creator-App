#[macro_use] extern crate rocket;

use std::{fs, path::Path, vec};
use rocket::fs::NamedFile;
// use serde_json::{Result, value};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
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
fn get_faction(faction: &str) -> String {
    fs::read_to_string(&format!("{}/factions/{}.json", std::env::current_dir().unwrap().display() ,faction)).unwrap()
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
    match fs::read_to_string(Path::new(&format!(".\\lists\\{}.json", name))) {
        Ok(_) => fs::read_to_string(Path::new(&format!(".\\lists\\{}.json", name))).unwrap().to_string(),
        Err(e) => format!("Invalid request, the requested list was not found: {}\n\n{:#?}", name, e)
    }
}

#[get("/<model>")]
fn get_model(model: String) -> String {
    fs::read_to_string(&format!("{}\\models\\{}.json", std::env::current_dir().unwrap().display() , model)).unwrap()
}

#[get("/<profile>")]
fn get_profile(profile: String) -> String {
    fs::read_to_string(&format!(".\\configs\\{}.json", profile)).unwrap()
}

#[get("/<rule>")]
fn get_rule(rule: String) -> String {
    fs::read_to_string(&format!(".\\rules\\{}.json", rule)).unwrap()
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

// OPTIONS HANDLERS
#[rocket::options("/lists")]
fn cors_post_handler() {
}

// POST REQUESTS
#[post("/lists", format = "json", data = "<new_list>")]
fn post_list(new_list: rocket::serde::json::Json<List>) -> Result<String, std::io::Error> {
    // Get the file name and serialize the struct into JSON \\
    let filename = format!("./lists/{}.json", &new_list.Name);
    let serialized = serde_json::to_string(&new_list.into_inner()).unwrap();
    fs::write(filename, serialized)?;
    Ok(format!("List created successfully"))
}
#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .configure(rocket::Config::figment().merge(("port", 8000)))
        .mount("/", routes![json_schema, get_factions_list, get_lists, get_list, post_list, cors_post_handler])
        .mount("/factions", routes![get_faction])
        .mount("/models", routes![get_model])
        .mount("/profiles", routes![get_profiles, get_profile])
        .mount("/rules", routes![get_rules, get_rule])
}