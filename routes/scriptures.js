const { Router } = require("express");
const ScripturesController = require("../controllers/scriptures.controller");
const loadUser = require("../middleware/loadUser");

const router = Router();

router.use([loadUser]);

router.get("/", ScripturesController.index);
router.post("/", ScripturesController.create);

module.exports = router;
