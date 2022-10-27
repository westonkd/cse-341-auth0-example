const ScripturesController = {
  index: (req, res) => {
    res.json(req.user.favoriteScriptures);
  },
};

module.exports = ScripturesController;
