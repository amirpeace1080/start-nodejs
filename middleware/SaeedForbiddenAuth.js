module.exports = (req, res, next) => {
  if (req.query.name === "saeed")
    return res.send("ما به سعیدا جواب نمیدیم");
  next();
};