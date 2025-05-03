import Course from "./Course.js";
import Instructor from "./Instructor.js";
import Category from "./Category.js";

// Связь Курс -> Преподаватель
Course.belongsTo(Instructor, {
  foreignKey: "instructor_id",
  as: "instructor",
});

Instructor.hasMany(Course, {
  foreignKey: "instructor_id",
  as: "courses",
});

// Связь Курс -> Категория
Course.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Category.hasMany(Course, {
  foreignKey: "category_id",
  as: "courses",
});

export { Course, Instructor, Category };
