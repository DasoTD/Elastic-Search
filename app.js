const express = require('express');
const app = express();
const routes = require('./route');
const PORT = process.env.PORT || 3000;

app.use('es', routes);
app.listen(PORT, ()=> {
    console.log(`the server is ruuning on port: ${PORT}`);
});
