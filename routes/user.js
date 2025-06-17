const express = require("express");
const router = express.Router();

router.use(logger);

// http://localhost:3000/users?name=John => query
router.get("/", (req, res) => {
  console.log(req.query.name);
  res.send("User List");
});

// http://localhost:3000/users/new => chạy đến file ./views/users/new.ejs
router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "Test" });
});

// kiem tra ten hop le => neu hop le thi in ra hoac ko hop le thi se bao loi
router.post("/", (req, res) => {
  const isValid = true;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("error");
    res.render("users/new", { firstName: req.body.firstName });
  }
  console.log(req.body.firstName);
  res.send("Hi");
});

// http://localhost:3000/users/[params] => lay user co id la 1
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User With ID: ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID: ${req.params.id}`);
  });

const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
