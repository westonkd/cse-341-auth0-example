const mongoose = require("mongoose");

const ScripturesController = {
  index: (req, res) => {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    res.status(200);
    res.json(req.user.favoriteScriptures);
  },
  create: async (req, res) => {
    try {
      const { user } = req;

      if (!req.user) {
        return res.status(401).send("Not Authenticated");
      }

      user.favoriteScriptures.push({
        book: req.body.book,
        chapter: req.body.chapter,
        verses: req.body.verses,
      });

      await user.save();

      res.status(200);
      res.json(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422);
      }

      res.status(500);

      res.json(error);
    }
  },
};

module.exports = ScripturesController;
