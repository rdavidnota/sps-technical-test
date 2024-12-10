const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

// Lee todos los archivos en el directorio excepto este mismo archivo
fs.readdirSync(__dirname).forEach((file) => {
    if (file !== 'index.js' && file !== 'dependencies.routes.js' && file.endsWith('.js')) {
        const route = require(path.join(__dirname, file));
        router.use(route); // Agrega las rutas del archivo al router principal
    }
});

module.exports = router;
