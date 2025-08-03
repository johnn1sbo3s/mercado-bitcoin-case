import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, 'dist');

app.use(cors());
app.use(express.json());
app.use(express.static(distPath, { index: false }));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.post('/registration', (req, res) => {
  if (Object.values(req.body).some(value => value === '')) {
    return res.status(400).json({ message: 'Há campos vazios.' });
  }
  res.status(201).json({ message: 'Cadastro realizado com sucesso.' });
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
