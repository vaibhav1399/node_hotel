const express = require('express')
const router = express.Router();

const MenuItem = require('./../models/MenuItem');



router.post('/', async(req, res) => {
    try{
        const data = req.body
        const newmenu = new MenuItem(data)
        const response = await newmenu.save();
        console.log('Data Saved')
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})



router.get('/', async(req, res) =>{
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched');
        res.status(200).json(data);

    }
    catch{
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;