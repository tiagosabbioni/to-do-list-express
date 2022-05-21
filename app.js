"use strict";

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const checklistsRouter = require("./src/routes/checklists");
const taskRouter = require("./src/routes/tasks");
const rootRouter = require("./src/routes/index");
require("./config/database");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);
app.use("/checklists", checklistsRouter);
app.use("/checklists", taskRouter.checklistDependentRoute);

app.listen(3000, () => {
    console.log("Servidor Iniciado");
});