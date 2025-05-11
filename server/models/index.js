import Course from "./Course.js";
import Instructor from "./Instructor.js";
import Category from "./Category.js";
import Application from "./Application.js";
import Testimonial from "./Testimonial.js";
import Publication from "./Publication.js";
import AboutPage from "./AboutPage.js";

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

// Связь Отзыв -> Заявка (уникальный алиас)
Testimonial.belongsTo(Application, {
  foreignKey: "application_id",
  as: "application", // алиас для связи belongsTo
});

Application.hasMany(Testimonial, {
  foreignKey: "application_id",
  as: "applicationTestimonials", // уникальный алиас для hasMany
});

// Связь Отзыв -> Курс (уникальный алиас)
Testimonial.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course", // алиас для связи belongsTo
});

Course.hasMany(Testimonial, {
  foreignKey: "course_id",
  as: "courseTestimonials", // уникальный алиас для hasMany
});

export {
  Course,
  Instructor,
  Category,
  Application,
  Testimonial,
  Publication,
  AboutPage,
};
