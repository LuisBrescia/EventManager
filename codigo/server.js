const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// Defina os diretórios para as pastas de recursos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'JS')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Defina o diretório para os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Listas.html'));
});
app.get('/Listas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Listas.html'));
});
app.get('/Fluxo.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Fluxo.html'));
});
app.get('/Chamados.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Chamados.html'));
});
app.get('/Collection.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Collection.html'));
});
app.get('/Valores.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'HTML', 'Valores.html'));
});

// Defina a porta em que o servidor irá escutar
const port = 3000;

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
