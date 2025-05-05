import React, { useEffect, useState } from "react";
import "../../main.css";
import Card from "../Card";
import CardMenu from "../PageCurses/CardMenu";
import Button from "../Button";

function BlockTwo(props) {
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/top-courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTopCourses(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCourses();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="blocktwo _container">
      <div className="blocktwo_container">
        <h1>ВАС ОЖИДАЕТ</h1>
        <div className="blocktwo_grid">
          <Card text="Опытные специалисты" />
          <Card text="Поддержка 24/7" />
          <Card text="Практические задания" />
        </div>
        <p className="blocktwo_textblock">
          Чтобы учится у нас не нужны <b>никакие</b> экзамены
        </p>
      </div>
      <div className="blocktwo_cardsgrid">
        <h1>КАКИЕ КУРСЫ МЫ ПРЕДЛАГАЕМ</h1>
        {topCourses.map((course) => (
          <CardMenu
            key={course.id}
            text={course.title}
            bg_img={course.cover_url || "/default_course.jpg"}
            href={`/courses/${course.id}`}
          />
        ))}
      </div>
      <Button text="все курсы" link="/curses" />
    </div>
  );
}

export default BlockTwo;
