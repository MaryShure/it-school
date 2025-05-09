import "../main.css";
import { useState, useEffect } from "react";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка комментариев из БД
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/testimonials/approved"
        );
        if (!response.ok) {
          throw new Error("Не удалось загрузить комментарии");
        }
        const data = await response.json();
        setComments(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? comments.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === comments.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="loading">Загрузка комментариев...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (comments.length === 0)
    return <div className="no-comments">Пока нет комментариев</div>;

  return (
    <div className="comment_container _container">
      {/* Левая стрелка */}
      <div
        className="left_arrow"
        onClick={handlePrev}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#9664;
        </span>
      </div>

      {/* Слайдер */}
      <div
        className="card_style"
        style={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: window.innerWidth <= 500 ? "300px" : "482px", // Разная высота для мобильных и десктопа
        }}
      >
        <div
          className="comment"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div className="user_info" style={{ marginBottom: "16px" }}>
            <div style={{ width: "100%" }}>
              <p
                className="user_name"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  margin: "0 0 8px 0",
                }}
              >
                {comments[currentSlide].user?.surname}{" "}
                {comments[currentSlide].user?.name}
              </p>
              <p
                className="user_profession"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  margin: 0,
                }}
              >
                {comments[currentSlide].course?.title}
              </p>
            </div>
          </div>
          <div
            className="comment_bubble"
            style={{
              flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 6, // Ограничение количества строк
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {comments[currentSlide].comment}
          </div>
        </div>
      </div>

      {/* Правая стрелка */}
      <div
        className="right_arrow"
        onClick={handleNext}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &#9654;
        </span>
      </div>
    </div>
  );
}
