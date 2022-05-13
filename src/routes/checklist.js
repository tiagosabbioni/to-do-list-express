const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("Checklist Opened");
    let rawItems = fs.readFileSync("src/storage/checklistItems.json");
    let items = JSON.parse(rawItems);
    let output = "<div>";
    items.items.map(item => {
        output += `<h1>${item.title}</h1><p>${item.subtitle}</p>`;
    });
    output == "</div>";
    res.send(output);
});

module.exports = router;