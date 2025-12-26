const Captain = require("../models/captain.model");


module.exports.createCaptain = async ({ fullname, email, password, vechical }) => {
  return await Captain.create({
    fullname,
    email,
    password,   
    vechical,
  });
};