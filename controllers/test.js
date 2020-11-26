"use strict";

const mongoose = require("mongoose");
const { Story, Person } = require("./../models/test");

const controller = {
  savePerson: (req, res) => {
    const { name, age } = req.body;
    const author = new Person({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      age: age,
    });
    author.save((err) => {
      if (err) return res.send({ err: err });
      return res.status(200).send({
        author,
      });
    });
  },
  saveStory: (req, res) => {
    const { author } = req.query;
    const { title } = req.body;
    const story1 = new Story({
      title: title,
      author: author,
    });
    story1.save((err) => {
      if (err) return res.send({ err });
      Story.findOne(story1._id)
        .populate('author')
        .exec((err, story) => {
          if (err) return res.send({ err });
          return res.send({
            story,
          });
        });
    });
  },
};

module.exports = controller;
