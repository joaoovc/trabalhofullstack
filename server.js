const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));