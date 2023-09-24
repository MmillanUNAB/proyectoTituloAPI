const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = 8001;

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 5000 }));
app.use(express.static(path.join(__dirname + '/public')));


// Importación de rutas
require('./src/routes/urls')(app);

app.listen(PORT, () => {
    console.log(`Starting development server on http://localhost:${PORT}`);
});