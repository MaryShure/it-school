import "../../main.css";
import Button from "../Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrderForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    surname: "",
    name: "",
    patronym: "",
    birth_date: "",
    telephone: "",
    email: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Не удалось загрузить данные курса");
        }
        const data = await response.json();
        setCourse(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s\-\(\)]{7,}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Формируем дату в формате YYYY-MM-DD
    const birth_date = `${year}-${String(months.indexOf(month) + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    try {
      if (!validateEmail(formData.email)) {
        alert("Пожалуйста, введите корректный email");
        return;
      }

      if (!validatePhone(formData.telephone)) {
        alert("Пожалуйста, введите корректный номер телефона");
        return;
      }

      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          birth_date,
          course_name: courseId,
        }),
      });

      const data = await response.json();

      // Очищаем форму
      setFormData({
        surname: "",
        name: "",
        patronym: "",
        telephone: "",
        email: "",
      });
      setDay("");
      setMonth("");
      setYear("");
      setIsChecked(false);

      // Показываем сообщение об успехе
      setIsSubmitted(true);

      // Скрываем сообщение через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (loading) return <div>Загрузка данных курса...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!course) return <div>Курс не найден</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mainblock__body">
        <h1 className="mainblock__title _container">Запись на курс</h1>
        <div className="mainblock__buttons _container">
          <p>{course.title}</p>
        </div>
      </div>
      <div className="card_style orderform_block mainblock__buttons _container">
        {isSubmitted && (
          <div className="success-message pb-5">
            Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
          </div>
        )}
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
            />
          </div>
          <div className="order_input">
            <p>E-mail:</p>
            <input
              id="email"
              type="email"
              className="order_field"
              placeholder="email@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
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
          <Button type="submit" text="отправить" />
        </div>
      </div>
    </form>
  );
}
