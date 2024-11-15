use rocket::tokio::fs;

use crate::List;

pub fn parse_json(list: List) -> Result<String, &'static str> {
    let list_obj = List::init();

    Err("Not implemented error")
}

pub async fn file_out(src: List, path: String) -> Result<(), &'static str> {
    if !std::fs::exists(&path).unwrap() {
        fs::create_dir(&path).await.unwrap();
    }

    let mut file_out = format!("{}{},{},{}", "{", src.name, src.detachment, src.points);
    for i in 0..src.models.len() {
        let mut h_comma = ",";
        if i != src.models.len() {
            h_comma = "";
        }
        file_out += format!("{}{}{}", src.models[i], h_comma, "}").as_str();
    }

    std::fs::write(path, file_out).unwrap();

    Ok(())
}
