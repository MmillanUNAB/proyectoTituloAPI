const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const sitiosModel = require('../models/SitiosModel');

const login = async(req, res) => {
    const requiredParams = {
        user: req.body.usuario || null,
        password: req.body.password || null,
    };
    console.log(requiredParams)
    if(Object.values(requiredParams).some(param => param === null)) return res.status(400).json({
        ok: false,
        message: 'Faltan parámetros obligatorios'  
    });
    const usuario= await UserModel.buscarUsuario(requiredParams.user);
    console.log(usuario[0].password);

    if(usuario.length === 0){
        return res.status(401).json({
            ok: false,
            message: 'Usuario/password incorrecto'
        });
    }
    if(requiredParams.password !== usuario[0].password){
        return res.status (401).json({
            ok: false,
            message: 'Usuario/password incorrecto'
        })
    }    
    const sitios= await sitiosModel.obtenerSitios();
    console.log(sitios);
    for (let sitio of sitios){
        const gps =await sitiosModel.gpsSitios(sitio.idsitios);
        sitio['gps']= gps;
    }

    delete usuario[0].password;

    return res.status(200).json({
        ok: true,
        message: 'Login OK',   
        data: {
            usuario:usuario[0],
            sitios
        }
    });
}

module.exports = {
    login
}