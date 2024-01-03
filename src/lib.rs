use regex::Regex;
use uuid::Uuid;
use wasm_bindgen::prelude::*;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn modify_cypher_query(cypher_query: &str, user_id: &str) -> String {
    let node_pattern = Regex::new(r"\((\w+):(\w+)\s*\{[^\}]*\}\)").unwrap();
    let relationship_pattern = Regex::new(r"\[(\w+):(\w+)\s*\{[^\}]*\}\]").unwrap();

    let mut modified_cypher_query = cypher_query.to_string();

    modified_cypher_query = node_pattern.replace_all(&modified_cypher_query, |caps: &regex::Captures| {
        format!("({}){{userId: '{}', id: '{}', ", &caps[0], user_id, Uuid::new_v4())
    }).to_string();

    modified_cypher_query = relationship_pattern.replace_all(&modified_cypher_query, |caps: &regex::Captures| {
        format!("[{}]{{userId: '{}', id: '{}', ", &caps[0], user_id, Uuid::new_v4())
    }).to_string();

    modified_cypher_query
}

#[wasm_bindgen]
pub fn modify_cypher_query2(cypher_query: &str, user_id: &str) -> String {
    let node_pattern = Regex::new(r"(\((\w+:\w+)\s*\{)([^\}]*)\}").unwrap();
    let relationship_pattern = Regex::new(r"(\[(\w+:\w+)\s*\{)([^\}]*)\}").unwrap();

    let mut modified_cypher_query = cypher_query.to_string();

    modified_cypher_query = node_pattern.replace_all(&modified_cypher_query, |caps: &regex::Captures| {
        let properties = if caps[3].trim().is_empty() {
            format!("{}userId: '{}'", &caps[1], user_id)
        } else {
            format!("{}userId: '{}', {}", &caps[1], user_id, &caps[3])
        };
        format!("{} }}", properties)
    }).to_string();

    modified_cypher_query = relationship_pattern.replace_all(&modified_cypher_query, |caps: &regex::Captures| {
        let properties = if caps[3].trim().is_empty() {
            format!("{}userId: '{}'", &caps[1], user_id)
        } else {
            format!("{}userId: '{}', {}", &caps[1], user_id, &caps[3])
        };
        format!("{} }}", properties)
    }).to_string();

    modified_cypher_query
}