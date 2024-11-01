const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userEnigmaSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        audio: Boolean,
        visuals: Boolean,
        web: Boolean,
    },
    {
        timestamps: true
    }
)

module.exports = userEnigmaSchema;
