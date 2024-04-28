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
    res.sendFile(path.join(__dirname, 'HTML/index.html'));
});
router.get('/Listas', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Listas.html'));
});
router.get('/Fluxo', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Fluxo.html'));
});
router.get('/Chamados', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Chamados.html'));
});
router.get('/Collection', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Collection.html'));
});
router.get('/Valores', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML/Valores.html'));
});

app.use(router);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
    console.log(`http://localhost:${port}`)
});
