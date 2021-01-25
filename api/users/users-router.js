const express = require("express");
const bcrypt = require("bcryptjs");
const protected = require("../auth/auth-middleware");
const Users = require("./users-model.js");

const router = express.Router();

router.get("/users", protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const hashedPass = bcrypt.hashSync(password, 12); // 2^12

  Users.add({ username, password: hashedPass })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const checkingUser = await Users.findBy({ username }).first();
      if (checkingUser && bcrypt.compareSync(password, checkingUser.password)) {
        req.session.user = checkingUser;
        res.json("welcome back");
      } else {
        res.status(401).json("invalid credentials");
      }
    } catch {
      res.status(500).json(err.message);
    }
  });

module.exports = router;
