const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    post_id: Number,
    writer: String,
    email: String,
    title: String,
    content: String,
    writeDate: { type: Date, default: new Date() },
});

const List = mongoose.model("List", listSchema, "lists");
module.exports = { List };
