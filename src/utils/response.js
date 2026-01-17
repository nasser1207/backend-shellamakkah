export const success = (res, data, message = "Success") => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const failure = (res, message = "Error", status = 500) => {
  res.status(status).json({
    success: false,
    message,
  });
};
