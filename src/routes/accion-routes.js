const express = require('express');

const router = express.Router();
const AccionController = require('../app/controllers/AccionController');


router.post('/registrar', AccionController.resitrarAccion);
router.get('/descargar', AccionController.descargarReporte);


module.exports = router;
