import "../main.css";
import { useState } from "react";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const comments = [
    {
      image: "comment3.jpg",
      name: "Андрей",
      profession: "Backend-разработка на Node.js",
      comment: "После курсов здесь я разрабатываю на Node как боженька",
    },
    {
      image: "comment1.jpg",
      name: "Марина",
      profession: "JavaScript для начинающих",
      comment: "Получила крайне положительный опыт, очень советую данные курсы",
    },
    {
      image: "comment2.jpg",
      name: "Костя",
      profession: "Адаптивная верстка и Flexbox",
      comment: "Много практики, реальных примеров и задач",
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? comments.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === comments.length - 1 ? 0 : prev + 1));
  };

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
        }}
      >
        <div className="comment">
          <div className="user_info" style={{ marginBottom: "16px" }}>
            <div className="user_img">
              <img
                src={comments[currentSlide].image}
                alt={comments[currentSlide].name}
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            <div>
              <p className="user_name">{comments[currentSlide].name}</p>
              <p className="user_profession">
                {comments[currentSlide].profession}
              </p>
            </div>
          </div>
          <div className="comment_bubble">{comments[currentSlide].comment}</div>
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
          &#9654; {/* Стрелочка вправо */}
        </span>
      </div>
    </div>
  );
}
