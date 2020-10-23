const { ValidationError } = require('sequelize')

const Exception = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ValidationError) {
    const detail = [];
    err.errors.forEach(element => {
      detail.push({
        path: element.path,
        message: element.message
      })
    });
    err.status = 400
    err.detail = detail
  }
  // render the error page
  const status = err.status || 500
  const message = err.message
  const detail  = err.detail

  res
    .status(status)
    .json({
        errors: {
        status, message, detail
      }
    })
}

module.exports = Exception
