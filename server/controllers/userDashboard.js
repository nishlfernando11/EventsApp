const User = require("../models/user");

const userDetails = async (req, res) => {
  user_id = req.body.user_token;
  try {
    const { docs } = await User.find({ user_token: user_id });
    res.status(200).send(docs[0]);
  } catch (error) {
    console.log(err);
    res.status(400).send({ msg: "No such user exists" });
  }
};

module.exports = {
  userDetails,
};
