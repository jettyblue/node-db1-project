const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if(name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
    return;
  }
  if(name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
    return;
  }
  if(typeof budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
    return;
  }
  if(budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
    return;
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  const allAccounts = await Accounts.getAll();
  const duplicateAccts = allAccounts.filter((account) => account.name === name);
  if(duplicateAccts.length > 0) {
    res.status(400).json({ message: "that name is taken" });
    return;
  }
  next();
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  const user = await Accounts.getById(id);
  if(user.length === 0) {
    res.status(404).json({ message: "account not found" });
    return;
  }
  req.user = user;
  next();
};
