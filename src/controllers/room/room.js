const room = async (req, res) => {
  res.render("room", { roomId: req.params.room });
};
module.exports = {
  room,
};
