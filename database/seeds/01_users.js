exports.seed = function (knex, Promise) {
  return knex("users").insert([
    { username: "mike", password: "hacked" },
    { username: "maton", password: "password" },
  ]);
};
