const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    email: String,
    name: String,
    post_id: String,
    content: String,
    writeDate: { type: Date, default: new Date() },
});

const Comment = mongoose.model("Comment", commentSchema, "comments");
module.exports = { Comment };
