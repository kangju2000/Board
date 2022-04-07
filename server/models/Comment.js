const mongoose = require("mongoose");
function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds));
}
const commentSchema = mongoose.Schema({
    email: String,
    name: String,
    post_id: String,
    content: String,
    writeDate: {
        type: Date,
        default: () => getCurrentDate(), //댓글 추가할때마다 시간 업데이트됨
    },
});

const Comment = mongoose.model("Comment", commentSchema, "comments");
module.exports = { Comment };
