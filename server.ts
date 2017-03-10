import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as ODataServer from "simple-odata-server";
import {MongoClient} from "mongodb";
import * as fs from "fs";


// Import routes
import RecipeRouter from './routes/recipe';
//import recipeModel from './models/recipe';


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    //this.odata();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // placeholder route handler
    router.get("/", (req, res, next) => {
      res.json({
        message: "Hello World!"
      });
    });
    this.express.use(express.static(path.join(__dirname, "www/html")))
    //this.express.use("/", router);
    this.express.use('/api/recipes', RecipeRouter);
  }

  // private odata(): void {   
  //   let self = this;

  //   let config = JSON.parse(fs.readFileSync("config.json", 'UTF-8')),
  //       url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.url}`;

  //   MongoClient.connect(url, function(err, db) {
  //     let odataServer = ODataServer()
  //                   .model({
  //                       namespace: "jsreport",
  //                       entityTypes: {
  //                           "RecipeType": {
  //                               "_id": {"type": "Edm.String", key: true},
  //                               "title": {"type": "Edm.String"},            
  //                               "description": {"type": "Edm.String"},            
  //                               "document_data": { type: "document_data" },            
  //                           }                           
  //                       },
  //                       complexTypes: {
  //                               "document_data": {
  //                               "description": {"type": "Edm.String"},
  //                               "headnote": {"type": "Edm.String"},
  //                           },
  //                       },  
  //                       entitySets: {
  //                           "recipes": {
  //                               entityType: "jsreport.RecipeType"
  //                           }
  //                       }
  //                   })
  //                   .onMongo(function(cb) { cb(err, db); });

  //     self.express.use("/odata", function (req, res) {
  //         odataServer.handle(req, res);
  //     });

  //   });



}


}

export default new App().express;