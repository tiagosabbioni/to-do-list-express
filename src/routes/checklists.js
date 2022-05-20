"use strict";

const express = require("express");

const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
    try {
        let checklists = await Checklist.find({});
        res.status(200).render("checklists/index", { checklists: checklists });
    }catch(error){
        res.status(500).render("pages/error", { error: "Erro ao exibir as listas" });
    }
});

router.get("/new", (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render("checklists/new", { checklist: checklist });
    }catch(error){
        res.status(500).render("pages/error", { error: "Erro ao carregar o formulário"});
    }
});

router.get("/edit/:id", async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/edit", { checklist: checklist});
    }catch(error){
        res.status(500).render("pages/error", {error: "Erro ao carregar o formulário"});
    }
});

router.get("/:id", async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render("checklists/show", { checklist: checklist });
    }catch(error){
        res.status(422).render("pages/error", { error : "Erro ao exibir a lista de tarefas" });
    }
})

router.post("/", async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({ name });

    try {
        await checklist.save();
        res.redirect("/checklists");
    }catch(error){
        res.status(422).render("checklists/new", { checklist: { ...checklist, error } });
    }
});

router.put("/:id", async (req, res) => {
    let { name } = req.body.checklist;
    try{
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).redirect(`/checklists/${req.params.id}`)
    }catch(error){
        res.status(422).render("pages/error", { error: "Erro ao editar o nome da lista"});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        let checklists = await Checklist.findByIdAndDelete(req.params.id);
        res.status(200).json(checklists);
    }catch(error){
        res.status(422).json(error);
    }
})

module.exports = router;