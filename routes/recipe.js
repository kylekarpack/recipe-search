"use strict";
const express_1 = require("express");
const fs = require("fs");
const odataToMongo = require("odata-v4-mongodb");
const parser = require("odata-v4-parser");
const URL = require("url");
const db = require("../db");
class RecipeRouter {
    // Initialize the RecipeRouter
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    // GET all Recipes.
    getAll(req, res, next) {
        fs.readdir("././recipes", (err, files) => {
            if (err) {
                res.send(err);
            }
            res.send(files);
        });
    }
    // GET recipes by searcjomg
    async search(req, res, next) {
        const query = decodeURI(URL.parse(req.url).query);
        //const filter = parser.parse(query || "");
        const mongoQuery = odataToMongo.createQuery(query);
        const fullQuery = parser.filter(req.params.$filter || "");
        let recipes = await db.searchRecipes(mongoQuery);
        res.json({
            query: mongoQuery,
            fullQuery: fullQuery,
            results: recipes
        });
        console.log("asunk");
        return;
    }
    // Attach router to express endpoints
    init() {
        //this.router.get("/search/:search", this.search);
        this.router.get("/", this.search);
    }
}
exports.RecipeRouter = RecipeRouter;
// Create the RecipeRouter, and export the Express.Router
const recipeRoutes = new RecipeRouter();
recipeRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = recipeRoutes.router;
//# sourceMappingURL=recipe.js.map