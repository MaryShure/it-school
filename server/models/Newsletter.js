import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Newsletter = sequelize.define(
  "newsletter",
  {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
    },
    recipients_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true, // Включаем автоматические временные метки
    createdAt: "sent_at", // Используем sent_at вместо createdAt
    updatedAt: false, // Отключаем updatedAt, так как он нам не нужен
  }
);

export default Newsletter;
