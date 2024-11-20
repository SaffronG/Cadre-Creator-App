#[macro_use] extern crate rocket;

use std::{fs, vec};
use rocket::fs::NamedFile;
// use serde_json::{Result, value};
use serde::{Deserialize, Serialize, Serializer};
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};

#[derive(Deserialize, Serialize, Debug)]
struct List {
    name: String,
    detachment: String,
    points: u32,
    models: Vec<String>,
}

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
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
    match fs::read_to_string(&format!("{}\\lists\\{}.json", std::env::current_dir().unwrap().display() , name)) {
        Ok(e) => fs::read_to_string(&format!("{}\\lists\\{}.json", std::env::current_dir().unwrap().display() , name)).unwrap(),
        Err(e) => format!("Invalid request, the requested list was not found\n\n{:#?}",e)
    }
}

#[get("/<model>")]
fn get_model(model: String) -> String {
    fs::read_to_string(&format!("{}\\models\\{}.json", std::env::current_dir().unwrap().display() , model)).unwrap()
}

// POST REQUESTS
#[post("/", format = "json", data = "<new_list>")]
fn post_list(new_list: rocket::serde::json::Json<List>) -> Result<String, std::io::Error> {
    // Get the file name and serialize the struct into JSON
    let filename = format!("./lists/{}.json", &new_list.name);
    let serialized = serde_json::to_string(&new_list.into_inner()).unwrap();
    fs::write(filename, serialized)?;
    Ok(format!("List created successfully"))
}
#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .mount("/", routes![json_schema, get_factions_list, get_lists, get_list])
        .mount("/factions", routes![get_faction])
        .mount("/models", routes![get_model])
        .mount("/lists", routes![post_list])
}