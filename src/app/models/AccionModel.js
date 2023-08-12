const db = require('../../config/database');

const registrarAccion = async (data) => {
    try {
        let query = `
            INSERT INTO acciones
            (accion, fecha, usuarios_id_usuarios, gps_idgps)
            VALUES (?, ?, ?, ?)
        `;
        let valores = [data.accion, new Date(), data.idUsuario, data.idGps]
        let resultado = await db.query(query, valores);
        return resultado;
    } catch (error) {
        console.log('Error al registrar accion: ', error);
        return undefined;
    }
}


module.exports = {
    registrarAccion
}