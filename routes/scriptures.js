const { Router } = require("express");
const ScripturesController = require("../controllers/scriptures.controller");
const loadUser = require("../middleeware/loadUser");

const router = Router();

router.use([loadUser]);

router.get("/", ScripturesController.index);

module.exports = router;
