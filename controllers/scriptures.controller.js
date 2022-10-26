const ScripturesController = {
  index: (req, res) => {
    res.json(req.user);
  },
};

module.exports = ScripturesController;
