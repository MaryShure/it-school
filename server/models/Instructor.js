import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Instructor = sequelize.define(
  "instructor",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: DataTypes.STRING,
    bio: DataTypes.TEXT,
    photo_url: DataTypes.STRING,
  },
  {
    timestamps: true,
    underscored: true,
  }
);

export default Instructor;
