const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

// app.use(express.static(path.join(__dirname, 'public')));

// Defina os diretórios para as pastas de recursos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'JS')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Defina o diretório para os arquivos HTML
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Listas.html'));
});
router.get('/Listas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Listas.html'));
});
router.get('/Fluxo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Fluxo.html'));
});
router.get('/Chamados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Chamados.html'));
});
router.get('/Collection.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Collection.html'));
});
router.get('/Valores.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Valores.html'));
});

app.use(router);

// Defina a porta em que o servidor irá escutar
const port = process.env.PORT || 3000;

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
