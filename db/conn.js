const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodemvc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("conectado com sucesso");
} catch (error) {
  console.log("não foi possível conectar", error);
}

module.exports = sequelize;
