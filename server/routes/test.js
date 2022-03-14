const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("http://localhost:3002/api/");
    res.send({ test: "Hello React x Node.js" });
});

module.exports = router;
