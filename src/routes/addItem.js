const express = require("express");
const fs = require("fs");

const router = express.Router();

router.post("/", (req, res) => {
    let title = req.body.title;
    let subtitle = req.body.subtitle;
    let newJson = JSON.parse(fs.readFileSync("src/storage/checklistItems.json"));
    newJson.items.push({title: title, subtitle: subtitle});
    fs.writeFile("src/storage/checklistItems.json", JSON.stringify(newJson), err => {
        if(err){
            console.log(err);
        }
    });
    res.send();
});

module.exports = router;