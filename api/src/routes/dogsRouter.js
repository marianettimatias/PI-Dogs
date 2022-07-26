const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getData, getdb } = require('./info')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const dogsRouter = Router();

dogsRouter.get('/', async (req, res) => {
    const { name } = req.query;
    let dogs = await getData();

    let dogs_info = dogs.map(info => {
        return {
            id: info.id,
            name: info.name,
            image: info.image ? info.image : `https://media.a24.com/p/d0f9662f172019cf39a28dfd4a217d8f/adjuntos/296/imagenes/008/984/0008984000/1200x675/smart/602d72d546bd3266540774jpg.jpg`,
            temperaments: info.temperaments,
            weight: info.weight ? info.weight : info.weight_min + ' - ' + info.weight_max,
            weight_min: info.weight.slice(0, 2).trim() ? info.weight.slice(0, 2).trim() : info.weight_min,
            weight_max: info.weight.slice(4).trim() ? info.weight.slice(4).trim() : info.weight_max,
            height: info.height ? info.height : info.height_min + ' - ' + info.height_max,
            height_min: info.height.slice(0, 2).trim() ? info.height.slice(0, 2).trim() : info.height_min,
            height_max: info.height.slice(4).trim() ? info.height.slice(4).trim() : info.height_max,
            life_span: info.life_span ? info.life_span : info.life_span_min + ' - ' + info.life_span_max,
            life_span_min: info.life_span.slice(0, 2).trim() ? info.life_span.slice(0, 2).trim() : info.life_span_min,
            life_span_max: info.life_span.slice(4).trim() ? info.life_span.slice(4).trim() : info.life_span_max,
            createdInDb: info.createdInDb
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
                image: info.image ? info.image : `https://media.a24.com/p/d0f9662f172019cf39a28dfd4a217d8f/adjuntos/296/imagenes/008/984/0008984000/1200x675/smart/602d72d546bd3266540774jpg.jpg`,
                temperaments: info.temperaments,
                weight: info.weight ? info.weight : info.weight_min + ' - ' + info.weight_max,
                weight_min: info.weight.slice(0, 2).trim() ? info.weight.slice(0, 2).trim() : info.weight_min,
                weight_max: info.weight.slice(4).trim() ? info.weight.slice(4).trim() : info.weight_max,
                height: info.height ? info.height : info.height_min + ' - ' + info.height_max,
                height_min: info.height.slice(0, 2).trim() ? info.height.slice(0, 2).trim() : info.height_min,
                height_max: info.height.slice(4).trim() ? info.height.slice(4).trim() : info.height_max,
                life_span: info.life_span ? info.life_span : info.life_span_min + ' - ' + info.life_span_max,
                life_span_min: info.life_span.slice(0, 2).trim() ? info.life_span.slice(0, 2).trim() : info.life_span_min,
                life_span_max: info.life_span.slice(4).trim() ? info.life_span.slice(4).trim() : info.life_span_max,
                createdInDb: info.createdInDb
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

    const { name, height, height_min, height_max, weight, weight_min, weight_max, image, life_span, life_span_min, life_span_max, temperaments } = req.body;
    
    const create_dog = await Dog.create({
        name,
        height,
        height_min,
        height_max,
        weight,
        weight_min,
        weight_max,
        image,
        life_span,
        life_span_min,
        life_span_max

    })

    const temp_db = await Temperament.findAll({
        where: { name: temperaments },

    })
    await create_dog.addTemperament(temp_db);
    res.send('Raza creada correctamente')


})

module.exports = dogsRouter;