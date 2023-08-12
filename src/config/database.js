const mysql = require( 'mysql' );
const util = require( 'util' );

let credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb',
    port: 3306,
}

module.exports = {
    query: ( sql, args) => {
        const connection = mysql.createConnection(credentials);
        let result = util.promisify( connection.query ).call(connection, sql, args);
        connection.end();
        return result;
    }
}