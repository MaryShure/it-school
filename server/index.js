import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import sequelize from "./config/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cookieParser from "cookie-parser";

// Получаем __dirname в ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Разрешаем запросы с обоих портов
const allowedOrigins = [
  "http://localhost:3000", // Админ-панель
  "http://localhost:3001", // Основной клиент
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Разрешаем запросы без origin (например, из Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "Доступ с этого origin запрещён CORS политикой";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Обработка статических файлов
app.use("/uploads", express.static(join(__dirname, "public/uploads")));
app.use("/api", router);
app.use(cookieParser());

const PORT = 5000;

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log("Подключение к БД успешно!");

    // Тестовый запрос
    const [result] = await sequelize.query("SELECT current_database()");
    console.log("Текущая БД:", result[0].current_database);

    await sequelize.sync();
    app.listen(PORT, () => console.log("Сервер запущен на порту " + PORT));
  } catch (e) {
    console.error("Ошибка:", e);
  }
}

startApp();
