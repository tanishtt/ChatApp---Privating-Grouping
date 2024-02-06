const mongoose = require('mongoose');

async function connectMongoDB(url){
  return  mongoose.connect(url)
.then(()=>{console.log('mongodb connected');})
.catch((err)=>{console.log('error')});
}

module.exports= {connectMongoDB};
// mongoose.connect('mongodb://127.0.0.1:27017/chatApp',(err)=>{
//     if(err){console.log('error : ',err);return;}

//     console.log('connected to mongodb');
// });