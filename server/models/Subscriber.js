import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subscriber = sequelize.define(
  "subscriber",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    subscribed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true, // Добавляет createdAt и updatedAt
    createdAt: "subscribed_at", // Используем subscribed_at как createdAt
    updatedAt: false, // Отключаем updatedAt, если он не нужен
  }
);

export default Subscriber;
