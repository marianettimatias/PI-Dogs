const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentRouter = require('./temperamentRouter');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentRouter);


module.exports = router;
