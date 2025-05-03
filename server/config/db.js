import { Sequelize } from "sequelize";

// Подключение к PostgreSQL
const sequelize = new Sequelize({
  database: "ITschool",
  username: "postgres",
  password: "blooD666Bunny",
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
