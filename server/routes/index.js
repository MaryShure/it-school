import express from "express";
import Application from "../models/Application.js";
import { Course, Instructor, Category } from "../models/index.js";
import Testimonial from "../models/Testimonial.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { Op } from "sequelize";
import { dirname, join, extname } from "path";

const router = express.Router();

// Роут для сохранения заявки
router.post("/apply", async (req, res) => {
  try {
    // Преобразуем course_name в course_id если нужно
    const applicationData = {
      ...req.body,
      course_name: req.body.course_name || req.body.course_id,
    };

    const application = await Application.create(applicationData);

    res.json({
      success: true,
      id: application.id,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Получение всех заявок
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление заявки
router.delete("/applications/:id", async (req, res) => {
  try {
    const result = await Application.destroy({
      where: { id: req.params.id },
    });
    if (result === 1) {
      res.json({ message: "Заявка успешно удалена" });
    } else {
      res.status(404).json({ message: "Заявка не найдена" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/search", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        error: "Не указан поисковый запрос",
      });
    }

    // Разбиваем запрос на отдельные слова
    const searchTerms = query.trim().split(/\s+/);

    // Создаем условия для каждого слова
    const titleConditions = searchTerms.map((term) => ({
      title: { [Op.iLike]: `%${term}%` },
    }));

    const descConditions = searchTerms.map((term) => ({
      description: { [Op.iLike]: `%${term}%` },
    }));

    const courses = await Course.findAll({
      where: {
        [Op.or]: [
          // Ищем совпадения по всем словам в названии
          { [Op.and]: titleConditions },
          // Ищем совпадения по всем словам в описании
          { [Op.and]: descConditions },
          // Ищем точное совпадение фразы в названии
          { title: { [Op.iLike]: `%${query}%` } },
          // Ищем точное совпадение фразы в описании
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "full_name"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [["rating", "DESC"]],
    });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Ошибка поиска:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Получение конкретного курса
router.get("/courses/:id", async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        error: "Неверный ID курса",
      });
    }

    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["full_name", "specialization"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Курс не найден",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Ошибка при получении курса:", error);
    res.status(500).json({
      success: false,
      error: "Внутренняя ошибка сервера",
    });
  }
});

router.get("/courses/top-rated", async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { is_in_top: true },
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "full_name"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [
        ["students_count", "DESC"],
        ["rating", "DESC"],
      ],
      limit: 3,
    });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching top courses:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
});

router.get("/top-courses", async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { is_in_top: true },
      order: [["rating", "DESC"]],
      limit: 3,
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "full_name"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Получение всех курсов
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "full_name"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      order: [["created_at", "DESC"]],
      attributes: {
        exclude: ["updatedAt"], // Исключаем поле, которого нет в таблице
      },
    });

    res.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Получаем __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../public/uploads/courses"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({ storage });

// Создание курса
router.post("/courses", upload.single("cover_image"), async (req, res) => {
  try {
    const requiredFields = ["title", "instructor_id", "category_id", "price"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Отсутствуют обязательные поля: ${missingFields.join(", ")}`,
      });
    }

    const courseData = {
      ...req.body,
      is_in_top: req.body.is_in_top === "true", // Преобразуем строку в boolean
      cover_url: req.file ? `/uploads/courses/${req.file.filename}` : null,
      created_at: new Date(),
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/courses/:id", async (req, res) => {
  try {
    const result = await Course.destroy({
      where: { id: req.params.id },
    });

    if (result === 1) {
      res.json({ success: true, message: "Курс успешно удалён" });
    } else {
      res.status(404).json({ success: false, error: "Курс не найден" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Роут для обновления курса
router.put("/courses/:id", upload.single("cover_image"), async (req, res) => {
  try {
    const { id } = req.params;
    const requiredFields = ["title", "instructor_id", "category_id", "price"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Отсутствуют обязательные поля: ${missingFields.join(", ")}`,
      });
    }

    const updateData = {
      ...req.body,
      is_in_top: req.body.is_in_top === "true", // Преобразуем строку в boolean
    };

    if (req.file) {
      updateData.cover_url = `/uploads/courses/${req.file.filename}`;
    }

    const [updatedRows] = await Course.update(updateData, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        error: "Курс не найден",
      });
    }

    const updatedCourse = await Course.findByPk(id, {
      include: [
        {
          model: Instructor,
          as: "instructor",
          attributes: ["id", "full_name"],
        },
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    res.json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ===== Роуты для категорий =====
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name", "description", "icon_url"],
    });
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ===== Роуты для преподавателей =====
router.get("/instructors", async (req, res) => {
  try {
    const instructors = await Instructor.findAll({
      attributes: ["id", "full_name", "specialization"],
      order: [["full_name", "ASC"]],
    });
    res.json({
      success: true,
      data: instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/testimonials - Создание нового отзыва
router.post("/testimonials", async (req, res) => {
  try {
    console.log("Получен запрос на создание отзыва:", req.body);

    const {
      surname,
      name,
      patronym,
      birth_date,
      telephone,
      email,
      course_id,
      comment,
      rating,
    } = req.body;

    // Проверка обязательных полей
    if (
      !surname ||
      !name ||
      !telephone ||
      !email ||
      !course_id ||
      !comment ||
      !rating
    ) {
      return res.status(400).json({
        success: false,
        error: "Все обязательные поля должны быть заполнены",
      });
    }

    // Поиск существующей заявки пользователя на курс
    const existingApplication = await Application.findOne({
      where: {
        surname,
        name,
        telephone,
        email,
        course_name: course_id.toString(),
      },
    });

    let application;
    if (existingApplication) {
      application = existingApplication;
    } else {
      // Создание новой заявки
      application = await Application.create({
        surname,
        name,
        patronym,
        birth_date,
        telephone,
        email,
        course_name: course_id.toString(),
      });
    }

    // Проверка, не оставлял ли пользователь уже отзыв на этот курс
    const existingTestimonial = await Testimonial.findOne({
      where: {
        application_id: application.id,
        course_id,
      },
    });

    if (existingTestimonial) {
      return res.status(400).json({
        success: false,
        error: "Вы уже оставляли отзыв на этот курс",
      });
    }

    // Проверка существования курса
    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Курс не найден",
      });
    }

    // Создание отзыва
    const testimonial = await Testimonial.create({
      application_id: application.id,
      course_id,
      comment,
      rating: parseInt(rating),
      is_approved: false,
    });

    res.status(201).json({
      success: true,
      data: {
        testimonial,
        application: {
          name: application.name,
          surname: application.surname,
        },
        course: {
          title: course.title,
        },
      },
    });
  } catch (error) {
    console.error("Ошибка создания отзыва:", error);
    res.status(500).json({
      success: false,
      error: "Внутренняя ошибка сервера",
      details: error.message,
    });
  }
});

// GET /api/testimonials/approved - Получение одобренных отзывов
router.get("/testimonials/approved", async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { is_approved: true },
      include: [
        {
          model: Application,
          attributes: ["name", "surname"],
        },
        {
          model: Course,
          attributes: ["title"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: 10,
    });

    res.json({
      success: true,
      data: testimonials.map((t) => ({
        id: t.id,
        comment: t.comment,
        rating: t.rating,
        created_at: t.created_at,
        user: {
          name: t.application.name,
          surname: t.application.surname,
        },
        course: {
          title: t.course.title,
        },
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/admin/testimonials - Получение отзывов для модерации
router.get("/admin/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { is_approved: false },
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["title"],
        },
        {
          model: Application,
          as: "application",
          attributes: ["name", "surname"],
        },
      ],
    });

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH /api/admin/testimonials/:id - Модерация отзыва
router.patch("/admin/testimonials/:id", async (req, res) => {
  try {
    const [updated] = await Testimonial.update(
      { is_approved: req.body.approve },
      { where: { id: req.params.id } }
    );

    if (updated) {
      res.json({
        success: true,
        message: "Отзыв успешно обновлен",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Отзыв не найден",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
