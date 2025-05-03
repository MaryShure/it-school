import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Импортируем из отдельного файла

const Application = sequelize.define(
  "application",
  {
    surname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    patronym: { type: DataTypes.STRING },
    birth_date: { type: DataTypes.DATEONLY },
    telephone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    course_name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

export default Application;
