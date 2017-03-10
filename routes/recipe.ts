import {Router, Request, Response, NextFunction} from "express";
import * as fs from "fs";
import * as odataToMongo from "odata-v4-mongodb";
import * as parser from "odata-v4-parser";
import * as URL from "url";
import * as db from "../db";


export class RecipeRouter {
  public router: Router;

  // Initialize the RecipeRouter
  constructor() {
    this.router = Router();
    this.init();
  }

  // GET all Recipes.
  public getAll(req: Request, res: Response, next: NextFunction) {
    fs.readdir("././recipes", (err, files) => {
      if (err) {
        res.send(err);
      }

      res.send(files);
    });
  }

  // GET recipes by searcjomg
  public async search(req: Request, res: Response, next: NextFunction) {
    const query: string = decodeURI(URL.parse(req.url).query);
    //const filter = parser.parse(query || "");
    
    const mongoQuery = odataToMongo.createQuery(query);
    const fullQuery = parser.filter(req.params.$filter || "");
    
    try {
      let recipes = await db.searchRecipes(mongoQuery);
      res.json({
          query: mongoQuery,
          fullQuery: fullQuery,
          results: recipes
      });  
    } catch(e) {
      res.json(e);
    }

  }

  // Attach router to express endpoints
  init() {
    //this.router.get("/search/:search", this.search);
    this.router.get("/", this.search);
  }



}

// Create the RecipeRouter, and export the Express.Router
const recipeRoutes = new RecipeRouter();
recipeRoutes.init();

export default recipeRoutes.router;
