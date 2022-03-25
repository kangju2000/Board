const mongoose = require("mongoose");

const ListSchema = mongoose.Schema(
    {
        writer: String,
        title: String,
        content: String,
        writeDate: { type: Date, default: new Date() },
    },
    {
        collection: "list",
    }
);

const List = mongoose.model("List", ListSchema);
module.exports = { List };
