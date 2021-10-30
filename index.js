 const express = require('express');
 const routerApi = require('./routes');
 const cors = require('cors');
 const{logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

 const app = express();
 const port  = process.env.PORT ||3000;

 app.use(express.json());
 const whiteList = ['http://127.0.0.1:5500','https://myapp.co'];
  const options = {
    origin:(origin,callback)=>{
      if(whiteList.includes(origin) || (!origin)){
        callback(null,true);
      }
     else {
        callback(new Error('no permitido'));
      }
    }
  }
  app.use(cors(options));
 app.get('/', (req, res)=>{
    res.send('hola mi server  en express');
 });

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


 app.listen(port, ()=>{
    console.log('Mi port ' + port  )
 });
