const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURL ='mongodb://localhost:27017/hotel'
const mongoURL='mongodb+srv://tanuwaghmare2002:Tanu123@cluster0.ch2vx.mongodb.net/'
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology:true
})
const db = mongoose.connection;
//define event listner for db

db.on('connected',()=>{
     console.log('Connected to mongodb server');
      
})
db.on('error',(err)=>{
    console.error('MongoDb is not connected',err)

})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
    
})
module.exports= db;  