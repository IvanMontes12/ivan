const express = require("express");
const router = express.Router();

// Controllers
const {  renderAbout, renderinformacion, renderencuesta } = require("../controllers/index.controller");

router.get("/about", renderAbout);
router.get("/dever", renderinformacion);
router.get("/encuesta", renderencuesta);


module.exports = router;
