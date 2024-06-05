const express = require('express');
const cors = require('cors'); // Importando o cors uma única vez
const mysql = require('mysql2');
const app = express();

app.use(cors()); // Configurando o cors antes das rotas
app.use(express.json());

const db = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'names_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/names', (req, res) => {
  db.query('SELECT * FROM names', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/names', (req, res) => {
  const name = req.body.name;
  db.query('INSERT INTO names (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Name added');
  });
});

app.delete('/names/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM names WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Name deleted');
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
