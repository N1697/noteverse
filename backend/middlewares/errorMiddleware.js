const errorHandler = (err, req, res, next) => {
  //Step 1: Get the current status code of the res, if any
  const statusCode = res.statusCode ? res.statusCode : 500;

  //Step 2: Set the HTTP status code of the res to the value of statusCode
  res.status(statusCode);

  //Step 3: Send a JSON response with an object containing an error message and a stack trace
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
