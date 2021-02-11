const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallery = new Schema(
    {
        userId: Number,
        name: String,
        pictures: [String],
        thumbnail: String
    },
    { collection: "gallery" }
);

module.exports = mongoose.model("gallery", gallery);