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
    has_testimonial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Application.associate = (models) => {
  Application.hasMany(models.Testimonial, {
    foreignKey: "application_id",
    as: "testimonials",
  });
};

export default Application;
