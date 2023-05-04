//Here you will import route files and export them as used in previous labs
import router from "./customer.js";
import { router as products } from "./products.js";

const routeMethod = (app) => {
  app.use("/products", products);
  app.use("/", router);

  app.use("*", (req, res) => {
    res.status(404).send("page not found");
  });
};

export default routeMethod;
