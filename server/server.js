const express = require("express");
const cors = require("cors");
const app = express();
const test = require("./routes/test");

app.use(cors());
app.use("/api", test);
app.get("/api/hello", (req, res) => {
    res.send("하이요");
});

const port = 3002;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
