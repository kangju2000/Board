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
const listSchema = mongoose.Schema({
    post_id: Number,
    post_type: String,
    writer: String,
    email: String,
    title: String,
    content: String,
    views: { type: Number, default: 0 },
    writeDate: {
        type: Date,
        default: () => getCurrentDate(),
    },
});

const List = mongoose.model("List", listSchema, "lists");
module.exports = { List };
