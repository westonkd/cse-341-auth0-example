const ScripturesController = {
  index: (req, res) => {
    if (!req.user) {
      return res.status(401).send("Not Authenticated");
    }

    res.json(req.user.favoriteScriptures);
  },
  create: async (req, res) => {
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
  },
};

module.exports = ScripturesController;
