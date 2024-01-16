import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        producer: Boolean,
        artist: Boolean
    },
    {
        timestamps: true
    }
)

const user = mongoose.models.user || mongoose.model("user", userSchema);
export default user;