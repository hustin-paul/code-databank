const express = require("express");
const router = express.Router();
const { Profile, Replies } = require("../models");

router.get("/", (req, res) => {
  Profile.findAll()
    .then((profile) => res.status(200).json(profile))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post("/", (req, res) => {
  try {
    Profile.create({
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postCode: req.body.postCode,
      postType: req.body.postType,
      codeType: req.body.codeType,
      posterName: req.user.firstName,
      upVotes: req.body.upVotes,
      ownerId: req.user.id,
      userId: req.user.id,
    });
    res.status(200).json({
      message: "Post added to profile",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Post failed to add to profile",
    });
  }
});

router.delete("/:id", (req, res) => {
  Profile.destroy({
    where: {
      id: req.params.id,
      ownerId: req.user.id,
    },
  })
    .then((profile) =>
      res.status(200).json({
        profile: profile,
      })
    )
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
