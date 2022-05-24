const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    registered_at: { type: Date, required: true },
    rating: { type: Number, required: true },
});

module.exports = model("users", UserSchema);
