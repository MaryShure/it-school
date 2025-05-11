import { useEffect, useState } from "react";
import Button from "../Button";
import "../../main.css";

export default function FirstText_About() {
  const [sections, setSections] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about");
        const data = await response.json();

        // Группируем по секциям
        const grouped = data.data.reduce((acc, item) => {
          if (!acc[item.section]) acc[item.section] = [];
          acc[item.section].push(item);
          return acc;
        }, {});

        setSections(grouped);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      }
    };

    fetchData();
  }, []);

  if (!Object.keys(sections).length) return <div>Загрузка...</div>;

  return (
    <div className="about">
      {sections.main && (
        <div className="mainblock__body">
          <h1 className="mainblock__title _container">
            {sections.main[0].title}
          </h1>
          <div className="mainblock__buttons _container">
            <p dangerouslySetInnerHTML={{ __html: sections.main[0].content }} />
          </div>
        </div>
      )}

      {sections.history && (
        <div className="text_about_2 _container">
          {sections.history.map((item, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
          ))}
        </div>
      )}

      {sections.mission && (
        <div className="text_about_2 _container">
          {sections.mission.map((item, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
          ))}
        </div>
      )}

      {sections.values && (
        <div className="text_about_2 _container">
          <div className="card_style values">
            {sections.values[0].title && <h2>{sections.values[0].title}</h2>}
            <div
              dangerouslySetInnerHTML={{ __html: sections.values[0].content }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
