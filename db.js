"use strict";
const fs = require("fs");
const mongo = require("mongodb");
let config = JSON.parse(fs.readFileSync("config.json", 'UTF-8')), url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.url}`;
async function searchRecipes(query) {
    let db = await mongo.MongoClient.connect(url);
    try {
        let collection = await db.collection("recipes"), options = {
            limit: query.limit || 5
        }, recipes = await collection.find(query.query, options).toArray();
        return recipes;
    }
    catch (e) {
        return [];
    }
    finally {
        db.close();
    }
}
exports.searchRecipes = searchRecipes;
//# sourceMappingURL=db.js.map