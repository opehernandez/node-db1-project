const express = require('express')
const router = express.Router()
const Accounts = require('./accounts-model')
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware')
router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
    .then(acc => {
      res.status(200).json(acc)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.acc[0])
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const trimmed = {...req.body, name: req.body.name.trim()}
  Accounts.create(trimmed)
    .then(acc => {
      res.status(201).json(acc[0])
    })
    .catch(err => {
      next(err)
    })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then(acc => {
      res.json(acc[0])
    })
    .catch(err => {
      next(err)
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id) 
    .then(acc => {
      res.json(req.acc)
    })
    .catch(err => {
      next(err)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router;
