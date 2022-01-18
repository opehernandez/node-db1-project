const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget} = req.body
  if(name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  }
  else {
    const trimmed = name.trim()
    trimmed.length > 100 ? res.status(400).json({ message: "name of account must be between 3 and 100" }) : trimmed.length < 3 ? res.status(400).json({ message: "name of account must be between 3 and 100" })
    :
    isNaN(budget) || budget === null ?  res.status(400).json({ message: "budget of account must be a number" }) : budget < 0 || budget > 1000000 ? res.status(400).json({ message: "budget of account is too large or too small" })
    :
    next()
  }
} 

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getByName(req.body.name)
    .then(acc => {
      if(acc.length > 0) {
        res.status(400).json({message: "name is taken"})
      }
      else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
    .then(acc => {
      if(acc.length === 0) {
        res.status(404).json({message: 'account not found'})
      }
      else {
        req.acc = acc
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}


