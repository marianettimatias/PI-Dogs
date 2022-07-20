const { Router } = require('express');
const { getApi } = require('./info')
const { Temperament } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperamentRouter = Router();

temperamentRouter.get('/', async (req, res) => {
    const data_api = await getApi();
    const temperaments = data_api.map(info => info.temperaments ? info.temperaments : 'La raza no tiene temperamentos asociados')

    const temp = temperaments.join(', ').split(', ').sort()
    // let temps=temp.filter(Boolean)
    let temperament_set = [...new Set(temp)];
    console.log(temperament_set.length);


    temperament_set.forEach(e => {
        Temperament.findOrCreate({
            where: { name: e },
        })
    })
    const alltemperaments = await Temperament.findAll();

    res.status(200).send(alltemperaments);
})


module.exports = temperamentRouter;