const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/to-do-list", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Conectado ao MongoDB")).catch(err => console.log(err));