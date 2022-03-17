const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ test: "Hello React x Node.js" });
});

module.exports = router;
