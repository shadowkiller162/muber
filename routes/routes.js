const DriversController = require("../controllers/driver_controller");

module.exports = (app) => {
  // wath for incoming requests of method GET
  // to the route http://localhost:3050/api
  app.get("/api", DriversController.gretting);

  app.post("/api/driver", DriversController.create);
  app.put("/api/driver/:id", DriversController.update);
  app.delete("api/driver/:id", DriversController.delete);
  app.get("api/driver", DriversController.index);
};
