const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://Syoft:Syoft1234@cluster0.kxbr9.mongodb.net/?retryWrites=true&w=majority")
}

module.exports = connect;