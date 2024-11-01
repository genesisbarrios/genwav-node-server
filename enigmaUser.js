const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enigmaUserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        beats: Boolean,
        loops: Boolean,
        visuals: Boolean,
        web: Boolean,
    },
    {
        timestamps: true
    }
)

module.exports = enigmaUserSchema;
