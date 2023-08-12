const user = require('./user-routes');
const accion = require('./accion-routes');

module.exports = (app) => {

    app.use('/user', user);
    app.use('/accion', accion);
}