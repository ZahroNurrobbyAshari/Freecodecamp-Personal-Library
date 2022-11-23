/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const mongoose = require("mongoose");
const BookModel = require("../models").Book;
const ObjectId = mongoose.Types.ObjectId;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function (req, res) {
      let title = req.body.title;

      if (!title) {
        res.send("missing required field title");
      }

      const newBook = new BookModel({
        title: title || "",
      });

      BookModel.findOne({ title: title }, (err, bookData) => {
        if (!bookData) {
          let newBook = new BookModel({ title: title });
          console.log(newBook);
          newBook.save((err, data) => {
            err || !data ? res.send(err) : res.json(newBook);
          });
        } else {
          bookData.push(newBook);
          bookData.save((err, data) => [
            err || !data
              ? res.send("missing required field title")
              : res.json(newBook),
          ]);
        }
      });

      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;

      const { _id, title, comments, commentcount, __v } = req.body;

      BookModel.aggregate([
        { $match: { _id: bookid } },
        title != undefined ? { $match: { title: title } } : { $match: {} },
      ]).exec((err, data) => {
        !data ? res.json([]) : res.json([data]);
      });

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
