const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
 // Deletes ALL existing entries
 await knex("users").del();
 await knex("users").insert([
   {
     id: 1,
     username: "Alice",
     password: bcrypt.hashSync("pass1", 14),
     adminKey: "21",
   },
   {
    id: 2,
    username: "Bob",
    password: bcrypt.hashSync("pass2", 14),
    adminKey: null,
  },
  {
    id: 3,
    username: "testUser",
    password: bcrypt.hashSync("juicyboo", 14),
    adminKey: "21",
  },
]);
};
