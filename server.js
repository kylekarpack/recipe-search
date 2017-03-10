"use strict";
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// Import routes
const recipe_1 = require("./routes/recipe");
//import recipeModel from './models/recipe';
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        //this.odata();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // placeholder route handler
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World!"
            });
        });
        this.express.use(express.static(path.join(__dirname, "www/html")));
        //this.express.use("/", router);
        this.express.use('/api/recipes', recipe_1.default);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
//# sourceMappingURL=server.js.map