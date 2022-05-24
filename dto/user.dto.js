module.exports = class UserDTO {
    email;
    id;
    first_name;
    last_name;
    phone_number;
    registered_at;
    rating;

    constructor(model) {
        this.first_name = model.first_name;
        this.last_name = model.last_name;
        this.phone_number = model.phone_number;
        this.email = model.email;
        this.registered_at = model.registered_at;
        this.rating = model.rating;
        this.id = model._id;
    }
}
