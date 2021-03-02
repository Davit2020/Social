const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const mongoose=require("mongoose")
const http = require('http');
const { mongodbUrl}=require("./config/config")

const indexRouter = require('./routes/IndexRouter');
const authRouter = require('./routes/AuthRouter');
const todoRouter=require("./routes/ToDoRouter");
const adminRouter=require("./routes/AdminRouter");

const { verifyToken } = require('./middlewares/auth');

//connect to mongo DB
mongoose.connect(mongodbUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

let db=mongoose.connection

db.on("error",(err)=>{
  console.log(err)
})
db.on("connected",()=>{
  console.log("connected")
})




const app = express();

const server = http.createServer(app);

const io=require("socket.io")(server)


io.on("connection",(socket)=>{

  console.log("new user conected")
  console.log(socket.id)
 
  socket.on("new user",(data)=>{
    console.log("userData",data)
  })
  socket.on("new chat",(data)=>{
    console.log("=>",data)  
    io.emit("new chat",data)
  })


})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/todo',verifyToken,(req,res,next)=>{
  console.log("ru",req.user)
  next()
}, todoRouter);
app.use('/admin',verifyToken, adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports ={
  app,
  server
}
