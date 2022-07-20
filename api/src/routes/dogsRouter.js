const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getData, getdb } = require('./info')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogsRouter = Router();

dogsRouter.get('/', async (req, res) => {
    const { name } = req.query;
    let dogs = await getData();

    let dogs_info =  dogs.map(info => {
        return {
            name: info.name,
            image: info.image,
            temperaments: info.temperaments,
            weight: info.weight,
            height: info.height,
            life_span: info.life_span
        }
    })
    
   
    try {
        if (name) {
            let dogs_name = await dogs_info.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
            if (dogs_name.length) {
                res.status(200).send(dogs_name);
            }
        } else {
            res.status(200).send(dogs_info);
        }
    } catch (e) {
        res.status(404).send('Raza no encontrada');
    }
})

dogsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let dogs = await getData();
        let dogs_info = await dogs.map(info => {
            return {
                id: info.id,
                name: info.name,
                image: info.image.url,
                temperaments: info.temperaments,
                height: info.height.metric,
                weight: info.weight.metric,
                life_span: info.life_span
            }
        })
        let dogs_id = await dogs_info.find(dog => dog.id == id);
        if (dogs_id) {
            res.status(200).send(dogs_id)
        } else {
            res.status(404).send('Raza no encontrada')
        }
    } catch (e) {
        res.status(404).send('Raza no encontrada')
    }
})

dogsRouter.post('/', async (req, res) => {

    const { name, height, weight, image, life_span, temperaments } = req.body;
    console.log(req.body)

    
        const create_dog = await Dog.create({
            name,
            height,
            weight,
            image,
            life_span,
            
        })

        const temp_db = await Temperament.findAll({
            where: { name: temperaments },
           
        })
        await create_dog.addTemperament(temp_db);
        res.send('Raza creada correctamente')
   

})

module.exports = dogsRouter;