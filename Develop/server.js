const routes = require("./routes/apiRoutes");
const express = require("express");
const route = express();
const PORT = process.env.PORT||3002;

route.use(express.static("public"));
route.use(express.urlencoded({ extended: true }));
route.use(express.json());
route.use("/", routes);
route.listen(PORT, () => {
console.dir(`Now listening on port: ${PORT}`);
});