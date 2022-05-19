const express = require("express");

const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).json(checklists);
    }catch(error){
        res.status(422).json(error);
    }
});

router.get("/:id", async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).json(checklist);
    }catch(error){
        res.status(422).send(error);
    }
})

router.post("/", async (req, res) => {
    let { name } = req.body;
    try {
        let checklist = await Checklist.create({ name });
        res.status(200).json(checklist);
    }catch(error){
        res.status(422).json(error);
    }
});

router.get("/:id", (req, res) => {
    res.status(200).send(`ID: ${req.params.id}`);
});

module.exports = router;