import express from "express";
import { Pool } from "pg";

const router = express.Router();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ITschool",
  password: "blooD666Bunny",
  port: 5432,
});

// Роут для сохранения заявки
router.post("/apply", async (req, res) => {
  try {
    console.log("Получены данные:", req.body);
    const application = await Application.create(req.body);
    console.log("Запись создана:", application.toJSON());
    res.json(application);
  } catch (error) {
    console.error("Ошибка сохранения:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
