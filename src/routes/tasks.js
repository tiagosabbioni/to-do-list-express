"use strict";

const express = require("express");
const checklistDependentRoute = express.Router();
const router = express.Router();

const Checklist = require("../models/checklist");
const Task = require("../models/task");

checklistDependentRoute.get("/:id/tasks/new", (req, res) => {
    try{
        let task = new Task();
        res.status(200).render("tasks/new", { checklistId: req.params.id, task: task });
    }catch(error){
        res.status(500).render("pages/error", { error:  "Erro ao carregar o formulário" });
    }
});

checklistDependentRoute.post("/:id/tasks", async (req, res) => {
    let { name } = req.body.task;
    let task = new Task({ name, checklist: req.params.id});
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        checklist.tasks.push(task);
        await checklist.save();
        res.status(200).redirect(`/checklists/${req.params.id}`);
    }catch(error){
        let errors = error;
        res.status(500).render("tasks/new", { checklistId: req.params.id, task: { ...task, errors: errors } });
    }
});

router.delete("/:id", async (req, res) => {
    let task = await Task.findByIdAndDelete(req.params.id);
    try{
        let checklist = await Checklist.findById(task.checklist);
        checklist.tasks.splice(checklist.tasks.indexOf(task._id), 1);
        checklist.save();
        res.status(200).redirect(`/checklists`);
    }catch(error){
        console.log(error);
        res.status(500).render("pages/error", { error: "Erro ao deletar uma tarefa" });
    }
});

module.exports = { checklistDependentRoute: checklistDependentRoute, simpleRouter: router };