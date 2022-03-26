const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
    {
        writer: String,
        title: String,
        content: String,
        writeDate: { type: Date, default: new Date() },
    },
    {
        collection: "lists",
    }
);

const List = mongoose.model("List", listSchema);
module.exports = { List };
