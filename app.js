const cors = require('cors');
const express = require('express');
const morgan = require('morgan');


const app = express();
const PORT = 8001;

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 5000 }));


// Importación de rutas
require('./src/routes/urls')(app);

app.listen(PORT, () => {
    console.log(`Starting development server on http://localhost:${PORT}`);
});