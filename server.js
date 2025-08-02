import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.get('/registration', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.post('/registration', (req, res) => {
  console.log('Dados recebidos:', req.body);
  res.sendFile(path.join(distPath, 'index.html'));
});

app.get('/', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
