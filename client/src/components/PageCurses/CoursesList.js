import React, { useEffect, useState } from "react";
import "../../main.css";
import Curses_Slide from "./Curses_Slide";
import CardMenu from "./CardMenu";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Добавляем базовый URL к путям изображений
        const coursesWithFullImageUrl = data.data.map((course) => ({
          ...course,
          image_url: course.cover_url
            ? `http://localhost:5000${course.cover_url}`
            : "/default_course_image.jpg",
        }));

        setCourses(coursesWithFullImageUrl);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="loading">Загрузка курсов...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!courses.length) return <div className="empty">Курсы не найдены</div>;

  // Группируем курсы по категориям
  const coursesByCategory = courses.reduce((acc, course) => {
    const categoryName = course.category?.name || "Другие";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(course);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
        <Curses_Slide key={category} text={category}>
          {categoryCourses.map((course) => (
            <CardMenu
              key={course.id}
              text={course.title}
              bg_img={course.image_url}
              href={`/courses/${course.id}`}
            />
          ))}
        </Curses_Slide>
      ))}
    </>
  );
}
