const express = require('express');
const router = express.Router();

const Person = require('./../models/person')

router.post('/', async (req, res) => {
    // const data = req.body
    // const newPerson = new Person(data);
    // newPerson.save((error, savedPerson) =>{
    //     if(error){
    //         console.log('Error saving person', error);
    //         res.status(500).json({error: 'Internal server error'})
    //     }
    //     else{
    //         console.log("Data saved successfully");
    //         res.status(200).json({savedPerson});
    //     }
    // })
    try{
        const data = req.body
        const newPerson = new Person(data);
        
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(response);
       }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})


router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data); // Corrected this line
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:workType', async(req, res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log("Response Fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Internal server error'});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) =>{
    try{
        const person_id = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(person_id, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        
        console.log('Data updated');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const person_id = req.params.id;

        const response = await Person.findByIdAndDelete(person_id)

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        
        console.log('Data Delete')
        res.status(200).json({message : 'Person deleted successfully'});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;