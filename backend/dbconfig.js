var sql = require("mssql");

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

var requestt;

sql.connect(config, function (err) {
  if (err) console.log(err);

  requestt = new sql.Request();
});

module.exports = requestt;
