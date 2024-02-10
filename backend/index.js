const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;
var mssql = require("mssql");
const validateMiddleWare = require("./validator");

const app = express();
app.use(bodyParser.json());
app.use(cors());

var config = {
  user: "sa",
  password: "d4168f",
  server: "localhost",
  database: "ttassignment",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

app.get("/api/getall", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .query("SELECT * FROM Users ORDER BY id");

    res
      .status(200)
      .json({ data: result.recordset, errorMessage: null, isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      data: null,
      errorMessage: "Internal Server Error",
      isSuccess: true,
    });
  }
});

app.post("/api/add", validateMiddleWare, async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .input("hn", req.body.hn)
      .input("name", req.body.name)
      .input("lastname", req.body.lastname)
      .input("tel", req.body.tel)
      .input("email", req.body.email)
      .query("INSERT INTO Users VALUES (@hn, @name, @lastname, @tel, @email)");

    res.status(201).send({ data: null, errorMessage: null, isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      data: null,
      errorMessage: "Internal Server Error",
      isSuccess: false,
    });
  }
});

app.post("/api/edit", validateMiddleWare, async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .input("id", req.body.id)
      .input("hn", req.body.hn)
      .input("name", req.body.name)
      .input("lastname", req.body.lastname)
      .input("tel", req.body.tel)
      .input("email", req.body.email)
      .query(
        "UPDATE Users SET hn=@hn, name=@name, lastname=@lastname, tel=@tel, email=@email WHERE id=@id"
      );

    res.status(201).send({ data: null, errorMessage: null, isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      data: null,
      errorMessage: "Internal Server Error",
      isSuccess: false,
    });
  }
});

app.post("/api/delete", async (req, res) => {
  try {
    const pool = await mssql.connect(config);
    const result = await pool
      .request()
      .input("id", req.body.id)
      .query("DELETE FROM Users WHERE id=@id");

    res.status(201).send({ data: null, errorMessage: null, isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      data: null,
      errorMessage: "Internal Server Error",
      isSuccess: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
