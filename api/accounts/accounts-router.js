const router = require("express").Router();
const Accounts = require("./accounts-model");
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const data = await Accounts.getAll();
    res.json(data);
  } catch(err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res) => {
  try {
    const [user] = req.user;
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json({ message: "error getting account" });
  }
});

router.post("/", checkAccountNameUnique, checkAccountPayload, async (req, res) => {
    try {
      const { name, budget } = req.body;
      const postedAccount = await Accounts.create({ name: name.trim(), budget: budget });
      res.status(201).json({
        id: postedAccount.id,
        budget: postedAccount.account.budget,
        name: postedAccount.account.name
      });
    } catch(err) {
      res.status(500).json({ message: "error adding account" });
    }
  }
);

router.put("/:id", checkAccountId, checkAccountPayload, async (req, res) => {
  try {
    const { name, budget } = req.body;
    const { id } = req.params;
    const updatedAccount = await Accounts.updateById(id,
      { name: name.trim(), budget });
    res.status(200).json({
      id: updatedAccount.id,
      budget: updatedAccount.account.budget,
      name: updatedAccount.account.name,
    });
  } catch(err) {
    res.status(500).json({ message: "error adding account" });
  }
});

router.delete("/:id", checkAccountId, async (req, res) => {
  try {
    const { id } = req.params;
    const removedAccount = await Accounts.deleteById(id);
    res.status(200).json(removedAccount);
  } catch(err) {
    res.status(500).json({ message: "error deleting account" });
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customError: 'Hm. Something is wrong here.',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
