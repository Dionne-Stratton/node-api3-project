const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'could not add user.' + err.message})
  })
});

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
  const newPost = {...req.body, user_id:req.params.id}

  Posts.insert(newPost)
  .then(post => {
    res.status(210).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.get("/", (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.st
});

router.get("/:id", validateUserId, (req, res) => {
  const {id} = req.params
  Users.getById(id)
  .then(aUser => {
    res.status(200).json(aUser)
    .catch(err =>{
      console.log(err)
      res.status(500).json({error: err.message})
    })
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(test => {
    res.status(200).json({message: 'this user has gone byebye'})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
});

router.put("/:id", validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(newInfo => {
    res.status(200).json(newInfo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err.message})
  })
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
};

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "name required" });
  } else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "form fields required" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "text field required" });
  } else {
    next();
  }
};

module.exports = router;