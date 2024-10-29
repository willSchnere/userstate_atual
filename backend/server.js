const express = require('express');
const db = require('./db');
const cors = require('cors')
const app = express();
app.use(express.json());
const port = 3000;

app.use(cors({
  origin: '*'
}))


app.get('/', (req, res) => {
  res.send("Bem-vindo! Links para movimentação:\n" +
           "--get-- /visu - para visualizar todos os veículos;\n" +
           "--get-- /visu/:id - para visualizar veículo específico;\n" +
           "--post-- /add - para adicionar um veículo;\n" +
           "--delete-- /re/:id - para remover um veículo pelo ID;\n" +
           "--put-- /upt/:id - para atualizar um veículo pelo ID;\n");
});

app.get('/visu', (req, res) => {
  db.query(
    `SELECT * FROM veiculos`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ error: 'Erro ao consultar veículos' });
      }
      return res.json(results);
    }
  );
});

app.get('/visu/:id', (req, res) => {
const { id } = req.params;
  db.query(
    `SELECT ${id} FROM veiculos`,
    function (err, results, fields) {
      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ error: 'Erro ao consultar veículos' });
      }
      // Retorna os resultados como um objeto JSON
      return res.json(results);
    }
  );
});

app.post('/add', (req, res) => {
  const {marca, modelo, ano, prop, cor} = req.body;
  db.query(
    `INSERT INTO Veiculos (marca, modelo, ano, prop, cor) VALUES (?, ?, ?, ?, ?)`,
    [marca, modelo, Number(ano), prop, cor],
    function (err, results, fields){
      if (err){
        console.error('erro na inserção', err)
        return
      }
      console.log(results)
      console.log(fields)
    }
  )
  res.send(`Carro recebido: ${marca}, ${modelo}, ${ano}, ${prop}, ${cor}`);
});

app.put('/upt/:id', (req, res) => {
   const { id } = req.params;
   const {marca, modelo, ano, prop, cor} = req.body;
    db.query(
      `UPDATE veiculos set marca = ?, modelo = ?, ano = ?, prop = ?, cor = ? WHERE id = ?`,
      [marca, modelo, Number(ano), prop, cor],
      function (err, results, fields){
        if (err){
          console.error('erro na inserção', err)
          return
        }
        console.log(results)
        console.log(fields)
      }
    );
    res.send(`Carro atualizado: ${marca}, ${modelo}, ${ano}, ${prop}, ${cor}`);
  })

 app.delete('/re/:id', (req, res) => {
  const { id } = req.params;
  const {marca, modelo, ano, prop, cor} = req.body;
    db.query(
      `DELETE FROM veiculos WHERE id = ?`,
      [Number(id), marca, modelo, Number(ano), prop, cor],
      function (err, results, fields){
        if (err){
          console.error('erro na inserção', err)
          return
        }
        console.log(results)
        console.log(fields)
        res.send(`Carro deletado`);
      }
    )
    })

app.listen(port, () => {
  console.log(`API de veículos ouvindo na porta ${port}`);
});