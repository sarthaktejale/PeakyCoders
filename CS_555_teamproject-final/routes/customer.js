// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import express from "express";
import Router from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import { customer, products } from "../data/index.js";
import {
  remove,
  getAll,
  get,
  create,
  update,
  getByEmail,
} from "../data/customer.js";
const router = express.Router();

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
router.route("/").get(async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});
router.route("/home").get((req, res) => {
  res.redirect("/");
});

router.route("/about").get(async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/about.html"));
});
router.route("/sales").get(async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/salesPage.html"));
});
router.route("/index").get(async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
router.route("/successful").get(async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/success.html"));
});
router
  .route("/login")
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  })
  .post((req, res) => {
    console.log(req.body);
  });
router
  .route("/register")
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
  })
  .post(async (req, res) => {
    let data = req.body;
    const add = await customer.create(data);
    res.status(200).redirect("/successful");
  });
router
  .route("/customerLogin")
  .get(async (req, res) => {
    res.render("customerLogin", { title: "customer login", lay1: "head1" });
    res.sendFile(path.join(__dirname, "../static/homepage.html"));
  })
  .post(async (req, res) => {
    const x = await customer.getByEmail(req.body.uname);
    console.log(x);
  });

router.route("/retailerLogin").get(async (req, res) => {
  res.render("retailerLogin", { title: "customer login", layout: "header" });
});

router
  .route("/signup")
  .get(async (req, res) => {
    res.render("signUp", { title: "sign up" });
  })
  .post(async (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const mailid = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    const add = await customer.create(
      firstname,
      lastname,
      mailid,
      phoneNumber,
      10
    );
    res.status(200).send(add);
  });

export default router;
