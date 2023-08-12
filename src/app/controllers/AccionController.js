const accionModel= require('../models/AccionModel')


const resitrarAccion = async(req, res) => {
    const requiredParams = {
        accion: req.body.accion || null,
        idUsuario: req.body.idUsuario || null,
        idGps: req.body.idGps || null
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios'  
    });
    
    const nAccion= await accionModel.registrarAccion(requiredParams)
    console.log(nAccion);
    if (nAccion===undefined){
        return res.status(500).json({
            ok: false,
            message: 'No se pudo registrar',   
        });
    }

    return res.status(200).json({
        ok: true,
        message: 'Accion registrada',   
        
    });
}

module.exports = {
    resitrarAccion
}