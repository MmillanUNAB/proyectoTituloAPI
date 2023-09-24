const db = require('../../config/database');

const obtenerSitios = async () => {
    try {
        let query = `
            SELECT 
                idsitios,
                nombre,
                codigo,
                tipogg
            FROM sitios
        `;

        let resultado = await db.query(query, []);
        return resultado;
    } catch (error) {
        console.log('Error al obtener sitios: ', error);
        return undefined;
    }
}

const gpsSitios = async (idsitio) => {
    try {
        let query = `
            SELECT 
                idgps,
                numero,
                accion
            FROM gps
            WHERE sitios_idsitios= ?
        `;

        let resultado = await db.query(query, [idsitio]);
        return resultado;
    } catch (error) {
        console.log('Error al obtener gps: ', error);
        return undefined;
    }
}
module.exports = {
    obtenerSitios,
    gpsSitios
}