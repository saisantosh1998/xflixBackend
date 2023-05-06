const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");

// Send response on errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { code, message } = err;
    console.log(err)
    res.locals.errorMessage = err.message;

    const response = {
        code: code,
        message,
        ...(config.env === "development" && { stack: err.stack }),
    };

    if (config.env === "development") {
        console.error(err);
    }

    res.status(code).send(response);
};

module.exports = {
    errorHandler,
};