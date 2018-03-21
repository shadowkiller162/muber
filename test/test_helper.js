const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/muber_test");
  mongoose.connection
    .once('open', () => done())
    .on('error', (err) => {
      console.warn("Warning", error);
    });
});

beforeEach((done) => {
  const {drivers} = mongoose.connection.collections;
  drivers.drop()
    // ensureIndex 需要給array，另外注意 mongoose 文檔有問題
    .then(() => drivers.ensureIndex([{"geometry.coordinates":"2dsphere"}]))
    .then(() => done())
    .catch(() => done());
});
