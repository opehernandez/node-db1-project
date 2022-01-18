const db = require('../../data/db-config')
const getAll = () => {
  // DO YOUR MAGIC
  return db("accounts")
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert(account)
    .then(id => {
      return getById(id[0])
    })
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .update(account)
      .then(ids => {
        return getById(ids)
      })
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where({ id })
    .delete()
}

const getByName = name => {
  return db('accounts')
    .where({ name })
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}
