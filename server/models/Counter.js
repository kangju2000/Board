const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
    totalPost: Number,
    name: String,
});

const Counter = mongoose.model("Counter", counterSchema, "counter");
module.exports = { Counter };
