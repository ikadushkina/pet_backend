const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, index: { unique: true } },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
},  {
    timestamps: {
        createdAt: "registered_at",
        updatedAt: false,
    }
});

module.exports = model("users", UserSchema);
