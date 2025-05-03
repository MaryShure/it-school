import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Правильный импорт
import Button from "../Button";
import "../../main.css";

export default function CourseDetails(props) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourse(data.data || data); // Учитываем оба варианта структуры ответа
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <>
      <div className="about">
        <div className="mainblock__body">
          <h1 className="mainblock__title _container">{course.title}</h1>
          <div className="mainblock__buttons _container">
            <p>{course.description}</p>
          </div>
        </div>
      </div>
      <div className="card_curse_info">
        <div>
          <div className="card_style">
            <h1>Продолжительность курса</h1>
            <p>
              {course.duration_weeks +
                " недель" +
                " " +
                course.hours +
                " часов лекций" || "Не указано"}
            </p>
          </div>
        </div>
        <div className="card_style">
          <h1>Рейтинг курса</h1>
          <div className="rating">
            {renderRatingStars(course.rating || 5)}
            <p>
              {course.rating || 5} ({course.reviews_count || 0} отзывов)
            </p>
          </div>
        </div>
        <div className="price_and_button">
          <div className="card_style">
            <h1>Цена курса</h1>
            <p>{course.price || "Не указана"} бел.руб.</p>
          </div>
          <Button text="записаться" link={`/order?course_id=${course.id}`} />
        </div>
      </div>
    </>
  );
}

function renderRatingStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<div key={`full-${i}`} className="star filled"></div>);
  }

  if (hasHalfStar) {
    stars.push(<div key="half" className="star half-filled"></div>);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<div key={`empty-${i}`} className="star"></div>);
  }

  return stars;
}
