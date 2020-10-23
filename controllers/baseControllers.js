const index = (req, res, next) => {
  res.json({
    status: 200,
    message: 'Ok'
  })
}

module.exports = {
  index
}