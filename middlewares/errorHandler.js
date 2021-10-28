

function logErrors (err,req,res,next){
  console.log('log errors');
  console.error(error);
  next(err);
}
function errorHandler( err, req,res,next){
  console.log('error handler');
  res.status(500).json({
    message : err.message,
    stack :err.stack,

  })
}
function boomErrorHandler( err, req,res,next){
  console.log('boom error handler');
  if(err.isBoom){
    console.log('es boom ');
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err);
}
module.exports = {logErrors, errorHandler, boomErrorHandler};
