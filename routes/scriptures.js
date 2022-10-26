const { Router } = require("express");
const ScripturesController = require("../controllers/scriptures.controller");

const router = Router();

router.get("/", ScripturesController.index);

module.exports = router;
