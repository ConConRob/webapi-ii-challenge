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
        res.status(201).json({ ...data, title, contents });
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  }
});

routes.get("/", (req, res) => {
  Posts.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

routes.get("/:id",(req, res) => {
  Posts.findById(req.params.id)
    .then(data => {
      if(data.length > 0){
        res.status(200).json(data)
      }else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The post could not be removed" })
    })
})

module.exports = routes;
