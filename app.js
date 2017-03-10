"use strict";
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.static(`${__dirname}/public`));
app.get('/search', (req, res) => {
    res.header("Content-Type", "application/json");
    let search = (req.query.text || "").toLowerCase(), top = Number(req.query.top || 10), skip = Number(req.query.skip || 0);
    fs.readdir("recipes", (error, files) => {
        if (error) {
            res.status(500).send(error);
        }
        files = files.filter(el => el.toLowerCase().indexOf(search) > -1);
        files = files.slice(skip, top);
        res.send(files);
    });
    //res.send(JSON.stringify(req.query));
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=app.js.map