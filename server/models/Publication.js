import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Publication = sequelize.define(
  "publication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("news", "event", "featured"),
      allowNull: false,
      validate: {
        isIn: [["news", "event", "featured"]],
      },
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cover_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "publications",
  }
);

// Синхронизация модели с БД (для разработки)
Publication.sync({ alter: true })
  .then(() => console.log("Publication table synchronized"))
  .catch((err) => console.error("Error syncing Publication table:", err));

export default Publication;
