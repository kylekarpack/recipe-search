import * as fs from "fs";
import * as mongo from "mongodb";

let config = JSON.parse(fs.readFileSync("config.json", 'UTF-8')),
    url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.url}`;



export interface Recipe {
    _id: mongo.ObjectID;
    title: string;
    description: string;
}

export async function searchRecipes(query: any) {
    let db = await mongo.MongoClient.connect(url);

    try {
        let collection = await db.collection("recipes"),
            options = {
                limit: query.limit || 5
            }, recipes = await collection.find(query.query, options).toArray()
        
        return recipes;
    } catch(e) {
        return [];
    } finally {
        db.close();
    }   
   
}