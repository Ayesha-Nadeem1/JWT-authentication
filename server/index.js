const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoute');
dotenv.config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth',authRouter);

//mongo db connection
var MONGO_URL=`mongodb+srv://user1:${process.env.MONGO_PWD}@cluster0.mtk5zdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/demo`


mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err)=> {
    console.log('failed to connect with db');
});

db.once('open',()=>{
    console.log('connected with db');
});

//server
const port = 3000;
app.listen(port, () => {
    console.log('server is listening on port ' + port);
});

//global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });