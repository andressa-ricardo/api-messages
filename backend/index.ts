import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql2 from "mysql2";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "meubanco",
  password: process.env.PASSWORD,
});

function query(query:string){
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      function (err, results, ) {
        if (err) {
            return reject(err);
          } else {
            resolve(results);
          }
      }
    );
  });
}

function getMessages() {
  return query("SELECT * FROM `mensagens`")
}

function postMessages(mensagem: string) {
  return query('INSERT INTO `mensagens` (mensagem) VALUES (\'' + mensagem + '\')')
}

function deleteMessages(id: number) {
  return query(`DELETE FROM mensagens WHERE id = ${id}`)
}

app.get("/", (req, res) => {
  res.send("serve ligado");
});

app.get("/messages", async (req, res) => {
  const mensagens = await getMessages();
  res.send(mensagens);
});

app.post("/message", async (req, res) => {
  await postMessages(req.body.message);
  console.log(req.body.message);
  res.sendStatus(200)
});

app.delete('/message', async (req, res) => {
  await deleteMessages(req.body.id)
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log("rodando");
});
