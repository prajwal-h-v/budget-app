const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 2, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    console.log(user);
    next();
  });
});

UserSchema.statics.getUser = function (email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email: email }, (err, user) => {
      if (!err) {
        resolve(user);
      } else {
        reject({ error: err.message });
      }
    });
  });
};
UserSchema.statics.saveUser = function (user) {
  return new Promise((resolve, reject) => {
    this.create(user, (err, result) => {
      if (!err) {
        var createdUser = JSON.parse(JSON.stringify(result._doc));
        resolve(createdUser);
      } else {
        reject({
          error: err.message,
        });
      }
    });
  });
};

UserSchema.statics.getUsers = function (query) {
  return new Promise((resolve, reject) => {
    this.find(query)
      .this((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

UserSchema.statics.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    this.find()
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

var Users = mongoose.model("Users", UserSchema, "users");
module.exports = {
  Users: Users,
};
