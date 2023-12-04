const errHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "notFound":
      res.status(404).json({ message: "not found" });
      break;
    case "InvalidInput":
      res.status(400).json({ message: "Email / password cannot empty" });
      break;
    case "InvalidEmail/Password":
      res.status(401).json({ message: "Invalid email / password" });
      break;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "Forbidden":
      res.status(401).json({ message: "Forbidden" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = errHandler;
