import { Router } from 'express';
import Bike from '../../models/bicycle.js';
import bikeValidate from '../../middlewares/bike.validate.middleware.js';

const router = Router();

// @route POST api/bikes/add
// @descr Register bike
// @access Privat 
router.post('/add', bikeValidate, async (req, res) => {
    let {id, name, type, color, wheelSize, price, description} = req.body;

    try {
        const existBike = await Bike.findOne({id});
        if (existBike) {
            return res.status(400).json({Error: 'Bike with this ID already exist'});
        } 

        const bike = new Bike({
            id,
            name, 
            type,
            color,
            wheelSize,
            description,
            price: Number(price).toFixed(2),
        });

        await bike.save();
        res.status(200).json(bike);
    } catch (err) {
        res.status(500).json({Error: err.message})
    }

});

// @route GET api/bikes
// @descr Get all bikes
// @access Privat 
router.get('/', async (req, res) => {
   try {
        const bikes = await Bike.find();
        res.status(200).json(bikes);
   } catch (err) {
        res.sendStatus(500)
   }
});

// @route PUT api/bikes/update
// @descr Update status of bike
// @access Privat 
router.put('/update', async (req, res) => {
    const {_id, status} = req.body;

    try {
        const existBike = await Bike.findOne({_id});
        if (!existBike) {
            return res.status(404).json({Error: 'Bike with this ID does not exist'});
        } 

        await Bike.updateOne({_id: _id}, {$set: { status: status }})

        const bikes = await Bike.find();
        res.status(200).json(bikes);
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
});

// @route DELETE api/bikes/id
// @descr Delete bike
// @access Privat 
router.delete('/:id', async (req, res) => {
    try {
        const bike = await Bike.findOne({_id: req.params.id});
        if (!bike) {
            res.status(404).json({message: "Bike doesn't exist"});
        }

        await Bike.deleteOne({_id: req.params.id});

        if (!await Bike.findOne({_id: req.params.id})) {
            res.status(200).json({message: "Bike successfully deleted"});
        }
    } catch (err) {
        res.status(500).json({Error: err.message});
    }
});

export default router;