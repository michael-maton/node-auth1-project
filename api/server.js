const express = require("express");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router.js");

const server = express();
server.use(express.json());

server.use(
  session({
    name: "shrek",
    secret: "secret secret, I got a secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  })
);

server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
