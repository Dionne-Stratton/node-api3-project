const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then((userId) => {
      if (userId) {
        req.id == id;
        next();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "name required" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "form fields required" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "text field required" });
  } else {
    next();
  }
}

module.exports = router;
