import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import "../main.css";

export default function TestimonialForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Все хуки должны быть вызваны до любых условных операторов
  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronym: "",
    birth_date: "",
    telephone: "",
    email: "",
    rating: 0,
    comment: "",
  });

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!courseId) {
    return <div className="error">Ошибка: курс не определен</div>;
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!isChecked) {
        throw new Error("Необходимо дать согласие на обработку данных");
      }

      // Формируем дату рождения
      const birth_date = `${year}-${String(months.indexOf(month) + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      // Отправка данных на сервер
      const response = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          birth_date,
          course_id: courseId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке отзыва");
      }

      alert("Спасибо за ваш отзыв! Он будет опубликован после проверки.");
      // Перенаправление на страницу курса или другую страницу
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mainblock__body">
        <h1 className="mainblock__title _container">Оставить отзыв о курсе</h1>
      </div>

      <div className="card_style orderform_block mainblock__buttons _container">
        <div className="gridfields">
          <div className="order_input">
            <p>Фамилия:</p>
            <input
              id="surname"
              className="order_field"
              placeholder="Иванов"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order_input">
            <p>Дата рождения:</p>
            <div className="date_fields">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              >
                <option value="">День</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <option value="">Месяц</option>
                {months.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Год</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="order_input">
            <p>Имя:</p>
            <input
              id="name"
              className="order_field"
              placeholder="Иван"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order_input">
            <p>Телефон:</p>
            <input
              id="telephone"
              className="order_field"
              placeholder="+375 44 562 92 42"
              value={formData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order_input">
            <p>Отчество:</p>
            <input
              id="patronym"
              className="order_field"
              placeholder="Иванович"
              value={formData.patronym}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order_input">
            <p>E-mail:</p>
            <input
              id="email"
              className="order_field"
              placeholder="email@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Блок оценки и комментария */}
        <div className="testimonial-fields">
          <div className="rating-input">
            <p className="pt-10">Оценка курса:</p>
            <div className="square-rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`square ${formData.rating >= num ? "filled" : ""}`}
                  onClick={() => setFormData({ ...formData, rating: num })}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="comment-input">
            <p>Ваш отзыв:</p>
            <textarea
              id="comment"
              className="order_field"
              placeholder="Поделитесь вашими впечатлениями о курсе..."
              value={formData.comment}
              onChange={handleChange}
              required
              minLength="20"
              rows="5"
            />
          </div>
        </div>

        <div className="order_sendblock">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
            <span className="checkmark"></span>Я даю согласие на обработку
            персональных данных
          </label>
          <Button
            type="submit"
            text={isSubmitting ? "Отправка..." : "Отправить отзыв"}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
}
