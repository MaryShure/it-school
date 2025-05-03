import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Course = sequelize.define(
  "course",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    duration_weeks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    cover_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      // Явно указываем имя поля createdAt
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_in_top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // По умолчанию курс не в топе
    },
  },
  {
    timestamps: false, // Отключаем автоматические поля createdAt и updatedAt
    underscored: true, // Используем snake_case для имен полей
  }
);

export default Course;
