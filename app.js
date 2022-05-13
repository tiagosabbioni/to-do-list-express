
const express = require("express");
const checklistRouter = require("./src/routes/checklist");
const addItem = require("./src/routes/addItem");

const app = express();

app.use(express.json());
app.use("/addItem", addItem);
app.use("/checklist", checklistRouter);

app.listen(3000, () => {
    console.log("Servidor Iniciado");
});