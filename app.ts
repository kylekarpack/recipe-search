import * as fs from 'fs';
import * as express from 'express';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/search', (req, res) => {
  
  res.header("Content-Type", "application/json");
  
  let search: string = (req.query.text || "").toLowerCase(),
      top: number = Number(req.query.top || 10),
      skip: number = Number(req.query.skip || 0);
  
  fs.readdir("recipes", (error, files: string[]) => {
    
    if (error){
      res.status(500).send(error);
    }
    
    files = files.filter(el => el.toLowerCase().indexOf(search) > -1);
    files = files.slice(skip, top);
    res.send(files);
  });
  
  //res.send(JSON.stringify(req.query));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});