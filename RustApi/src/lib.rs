mod json_handler;
#[macro_use] extern crate rocket;

use rocket::serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct List {
    pub name: String,
    pub detachment: String,
    pub points: u64,
    pub models: Vec<String>,
}

impl List {
    pub fn init() -> List {
        List {
            name: String::new(),
            detachment: String::new(),
            points: 0,
            models: Vec::new(),
        }
    }

    pub fn build(r_name: String, r_detachment: String, r_points: u64, r_models: Vec<String>) -> List{
        List {
            name: r_name,
            detachment: r_detachment,
            points: r_points,
            models: r_models,
        }
    }
}

pub use crate::json_handler::file_out;

pub use crate::json_handler::parse_json;