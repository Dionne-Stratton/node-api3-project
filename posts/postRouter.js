const express = require("express");
const Posts = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  const { query } = req;
  Posts.get(query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then((nuke) => {
      res.status(200).json({ message: "This post is gone forever!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const edit = req.body;

  Posts.update(id, edit)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Posts.getById(id)
    .then((postId) => {
      if (postId) {
        req.id == id;
        next();
      } else {
        res.status(404).json({ message: `post with id ${id} not found` });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
}

module.exports = router;
