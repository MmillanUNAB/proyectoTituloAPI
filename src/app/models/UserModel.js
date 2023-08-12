const db = require('../../config/database');

const buscarUsuario = async (nombreUsuario) => {
    try {
        let query = `
            SELECT 
                id_usuarios,
                nombre,
                numero_telefono,
                password
            FROM usuarios
            WHERE nombre = ?
        `;

        let resultado = await db.query(query, [nombreUsuario]);
        return resultado;
    } catch (error) {
        console.log('Error al obtener usuario: ', error);
        return undefined;
    }
}

module.exports = {
    buscarUsuario
}