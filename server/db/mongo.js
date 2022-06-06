const { default: mongoose } = require("mongoose");

function connect() {
  mongoose
    .connect(
      "mongodb+srv://prajji:prajji@cluster0.czugucl.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("database connection successfull"))
    .catch((err) => console.error("database connection failed... ", err));
}

module.exports = { connect: connect };
