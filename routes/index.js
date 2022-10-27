const express = require("express");

const openCors = require("../middleeware/openCors");

const scriptureRoutes = require("./scriptures");
const authorizationRoutes = require("./authorization");

const router = express.Router();

// Global Middleware
router.use([openCors, express.json()]);

router.use("/authorization", authorizationRoutes);
router.use("/api/v1/scriptures", scriptureRoutes);

module.exports = router;
