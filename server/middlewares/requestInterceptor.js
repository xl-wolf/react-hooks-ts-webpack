module.exports = (callback) => (req, res, next) => {
  console.log('所有请求前的拦截')
  //所有请求前的拦截
  callback&&callback()
  next()
}