const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = async (id) => {
  return await db("accounts").where({ id });
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return { id, account };
};

const updateById = async (id, account) => {
  await db("accounts").where({ id }).update(account);
  return { id, account };
};

const deleteById = async (id) => {
  const result = await getById(id);
  await db("accounts").where({ id }).del();
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
