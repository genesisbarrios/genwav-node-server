const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        producer: { type: Boolean, default: false },
        artist: { type: Boolean, default: false },
        fan: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

const user = mongoose.models.user || mongoose.model("users", userSchema);
module.exports = user;
