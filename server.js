const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const PORT =process.env.PORT || 3000;

const Person = require('./models/Person');
const MenuItem= require('./models/MenuItem');
const Bill= require('./models/Bill')
const e = require('express');

app.get('/', function(req,res){
    res.send('WELLCOME TO OUR HOTEL..!')
})
// tan


app.get('/bill',async(req,res)=>{
    try{
        const item = await Bill.find()
        console.log('data fetched');
        res.status(200).json(item)
    }
    catch(err){
    res.status(500).json({error:'Iternal Server Error'})
    }
})
app.post('/bill',async(req,res)=>{

try{
    const data = req.body;
    const newBill = new Bill(data)
    const response = await newBill.save();
    console.log("data saved");
    res.status(200).json(response)
      
}
catch(err){
    console.log(err);   
    res.status(500).json({error:'Internal Server Error'}) 
}
}

)

//IMPORT ROUTER POINT

const personRoutes = require('./routes/personRoutes') 
const menuItemsRoutes =require('./routes/menuItemsRoutes')

app.use('/person',personRoutes)
app.use('/menuItem',menuItemsRoutes)

app.listen(PORT,()=>{
    console.log("server listening on 3000");
// console.log("server listening 30000");

})