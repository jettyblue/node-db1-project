// Imports
const router = require('express').Router();
const Accounts = require('./accounts-model');
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware');

// Endpoints
router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
    Accounts.getById(id)
      .then(account => {
        res.status(200).json(account);
      })
      .catch(err => {
        res.status(400).json({ message: err.message });
      })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount);
    })
    .catch(err => {
      res.status(400).json({ message: err.message});
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customError: 'something went wrong',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
