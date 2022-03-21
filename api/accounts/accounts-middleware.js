const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

// Middleware
const checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}

// Exports
module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}
