const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

// Middleware
const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if(name === undefined || budget === undefined) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' });
  } else if (typeof budget != 'number' || isNaN(budget) === true) {
    res.status(400).json({ message: 'budget of account must be a number' });
  }else if (budget > 1000000 || budget < 0) {
    res.status(400).json({ message: 'budget of account is too large or too small' });
  }
}

const checkAccountNameUnique = async (req, res, next) => {
  try {
    const matchingNames = await db('accounts').where('name', req.body.name).first();
    if(matchingNames) {
      res.status(400).json({ message: 'that name is taken' });
    } else {
      next();
    }
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

const checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      if(!account) {
        res.status(404).json({ message: 'account not found'});
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    })
}

// Exports
module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}
