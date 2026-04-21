function errorMiddleware(err, req, res, next) {
  console.log(`error: ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    detail: err.detail || null,
  });
}

export default errorMiddleware;
