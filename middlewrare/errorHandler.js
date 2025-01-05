// const { constants } = require("../constant.js");

// const errorHandler = (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;

//   console.log("Custom error handler invoked:", err.message, res.statusCode);

//   switch (statusCode) {
//     case constants.BAD_REQUEST:
//       res.status(statusCode).json({
//         title: "BAD REQUEST",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;

//     case constants.NOT_AUTHORIZED:
//       res.json({
//         title: "NOT AUTHORIZED",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;

//     case constants.FORBIDDEN:
//       res.json({
//         title: "FORBIDDEN",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;

//     case constants.NOT_FOUND:
//       res.json({
//         title: "NOT FOUND",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       console.log("xxxxxxxxxxx");
//       break;

//     case constants.SERVER_ERROR:
//       res.json({
//         title: "SERVER ERROR",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;

//     default:
//       res.json({
//         title: "UNKNOWN ERROR",
//         message: err.message,
//         stackTrace: err.stack,
//       });
//       break;
//   }
// };

// module.exports = { errorHandler };

const { constants } = require("../constant.js");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Standard error structure
  const errorResponse = {
    title: "",
    message: err.message || "An error occurred",
    ...(process.env.NODE_ENV !== "production" && { stackTrace: err.stack }),
  };

  switch (statusCode) {
    case constants.BAD_REQUEST:
      errorResponse.title = "BAD REQUEST";
      break;
    case constants.NOT_AUTHORIZED:
      errorResponse.title = "NOT AUTHORIZED";
      break;
    case constants.FORBIDDEN:
      errorResponse.title = "FORBIDDEN";
      break;
    case constants.NOT_FOUND:
      errorResponse.title = "NOT FOUND";
      break;
    case constants.SERVER_ERROR:
      errorResponse.title = "SERVER ERROR";
      break;
    default:
      errorResponse.title = "UNKNOWN ERROR";
      break;
  }

  // Send the error response with the appropriate status code
  res.status(statusCode).json(errorResponse);
};

module.exports = { errorHandler };
