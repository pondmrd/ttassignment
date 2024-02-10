const validateMiddleWare = (req, res, next) => {
  if (req.body.hn.length > 6) {
    return res.status(201).send({
      data: null,
      errorMessage: "the length of hn should not exceed 6.",
      isSuccess: false,
    });
  }
  if (req.body.name.length > 20) {
    return res.status(201).send({
      data: null,
      errorMessage: "the length of name should not exceed 20.",
      isSuccess: false,
    });
  }
  if (req.body.lastname.length > 20) {
    return res.status(201).send({
      data: null,
      errorMessage: "the length of lastname should not exceed 20.",
      isSuccess: false,
    });
  }
  if (req.body.tel.length > 10) {
    return res.status(201).send({
      data: null,
      errorMessage: "the length of tel should not exceed 10.",
      isSuccess: false,
    });
  }
  if (req.body.email.length > 50) {
    return res.status(201).send({
      data: null,
      errorMessage: "the length of email should not exceed 50.",
      isSuccess: false,
    });
  }
  var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validRegex.test(req.body.email)) {
    return res.status(201).send({
      data: null,
      errorMessage: "invalid Email Format",
      isSuccess: false,
    });
  }
  next();
};

module.exports = validateMiddleWare;
