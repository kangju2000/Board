const express = require("express");
const cors = require("cors");
const app = express();
const test = require("./routes/test");
const { User } = require("./models/User");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
mongoose
    .connect(process.env.DB_URI, {
        dbName: "board",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// let db = mongoose.connection;

app.use(cors());
app.use("/api", test);
app.get("/api/hello", (req, res) => {
    res.send("하이요");
});
app.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
