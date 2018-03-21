const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  xit("Post to /api/driver create new driver",(done) => {
    Driver.count()
      // 先計算 driver collection 中的數量
      .then((beforeCreateCount) => {
        request(app)
          .post("/api/driver")
          .send({email:"post@test.com"})
          .end(() => {
            // 在創建完新的 driver 後，再計算一次 driver collection 中的數量
            Driver.count()
              .then( (afterCreateCount) =>{
              // 確認 driver collection 中確實有新增一筆資料
              assert(beforeCreateCount+1 === afterCreateCount);
              done();
            });
          });
      });
  });

  xit("Put to /api/driver/:id update a existing driver", (done) => {
    const driver = new Driver({email:"put@test.com", driving:false});

    driver.save()
      .then(() => {
        request(app)
          // ES6等同 `/api/driver/${driver.id}`
          .put("/api/driver/" + driver._id)
          .send({driving:true})
          .end(() => {
            Driver.findOne({email:"put@test.com"})
              .then((driver) => {
                assert(driver.driving === true);
                done();
              });
          });
      });
  });

  it("Delete to /api/driver/:id delete a existing driver", (done) => {
    const driver = new Driver({email:"delete@test.com"});

    driver.save()
      .then(() => {
        request(app)
          .delete("/api/driver/" + driver._id)
          .end(() => {
            Driver.findOne({email:"delete@test.com"})
              .then((driver) => {
                console.log(driver);
                assert(driver === null);
                done();
              });
          });
      });
  });

  xit("GET to /api/driver to find srivers in a location", (done) =>{
    const seattleDriver = new Driver({
      email: "seattleDriver@test.com",
      geometry: { type:"Point", coordinates:[-122.4759902, 47.6147628]}
    });
    const miamiDriver = new Driver({
      email: "miamiDriver@test.com",
      geometry: { type:"Point", coordinates:[-80.253, 25.961]}
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get("/api/driver?lng=-80&lat=25")
          .end((err, response) => {
            console.log(response);
            done();
          });
      })
  });

});
