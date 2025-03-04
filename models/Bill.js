
// const {uniqueId}=require('lodash')
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    id:{
      type:Number,
      required:true,
      unique:true  

    },
    name:{
      type:String,
      required: true,
    },
    total:{
      type: Number,
      requires:true
    }
})
const Bill = mongoose.model('Bill', billSchema);
module.exports= Bill;