const { Router } = require("express");
const scriptureRoutes = require("./scriptures");
const authorizationRoutes = require("./authorization");

const router = Router();

router.use("/authorization", authorizationRoutes);
router.use("/api/v1/scriptures", scriptureRoutes);

module.exports = router;
