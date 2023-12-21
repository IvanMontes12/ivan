const express = require("express");
const router = express.Router();

const {

    guardarEncuesta,
    mostrarResultados,

}= require("../controllers/encuesta.controllers");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.post("/guardar/encuesta", guardarEncuesta);
router.get("/", mostrarResultados);

module.exports = router;