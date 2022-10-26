const { Router } = require("express");
const scriptureRoutes = require("./scriptures");

const router = Router();

router.use("/api/v1/scriptures", scriptureRoutes);

module.exports = router;
