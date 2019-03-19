const express = require("express");
const routes = express.Router();
const Posts = require("./data/db");

routes.use(express.json());

routes.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert(req.body)
      .then(data => {
        res.status(201).json({...data, title, contents});
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  }
});

module.exports = routes;
