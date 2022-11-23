const mongoose = require("mongoose");
const { Schema } = mongoose;

// Declare the Schema of the Mongo model
var BooksSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  commentcount: {
    type: Number,
  },
  comments: {
    type: Array,
  },
});

//Export the model
const Book = mongoose.model("Books", BooksSchema);

exports.Book = Book;
