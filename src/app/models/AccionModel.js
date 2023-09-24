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

const obtenerAcciones = async () => {
    try {
        let query = `
        SELECT
        s.codigo,
        s.nombre,
        s.tipogg,
        g.numero,
        u.nombre usuario,
        a.accion,
        DATE_FORMAT(fecha, '%Y-%m-%d') fecha
    FROM acciones a
    JOIN usuarios u ON a.usuarios_id_usuarios = u.id_usuarios
    JOIN gps g ON a.gps_idgps = g.idgps
    JOIN sitios s ON g.sitios_idsitios = s.idsitios
    ORDER BY a.idacciones DESC
        `;

        let resultado = await db.query(query, []);
        return resultado;
    } catch (error) {
        console.log('Error al obtener sitios: ', error);
        return undefined;
    }
}

module.exports = {
    registrarAccion,
    obtenerAcciones
}