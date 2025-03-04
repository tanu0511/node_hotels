const express= require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem');
// const { route } = require('./personRoutes');

router.post('/', async(req,res)=>{
    try{
        // console.log("request",)
        const data = req.body;

        const newMenuItem = new MenuItem(data)
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response)
    }
    catch(err){
    console.log(err);   
        res.status(500).json({error:'Internal Server Error'})       
    }
})

router.get('/:taste',async(req,res)=>{
    try {const taste = req.params.taste;
    if(taste=='Sweet'|| taste=='Sour'||taste=='Spicy'){
        const response = await MenuItem.find({food:taste})
        console.log('response fetched1');
        res.status(200).json(response)
        
    }
    else{
        res.status(404).json({error:'Invalid taste..!'})
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/', async(req,res)=>{
    try{
        const item = await MenuItem.find()
        console.log('data fetched');
        res.status(200).json(item)
    }
    catch(err){
        res.status(500).json({error:'Internal Server Error'})
    }
})
module.exports= router;
