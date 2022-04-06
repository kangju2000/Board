const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    email: String,
    post_id: String,
    content: String,
});

const Comment = mongoose.model("Comment", commentSchema, "comments");
module.exports = { Comment };
