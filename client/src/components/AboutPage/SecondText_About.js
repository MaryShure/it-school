import { useEffect, useState } from "react";
import Button from "../Button";
import "../../main.css";

export default function SecondText_About() {
  const [sections, setSections] = useState({
    partners: null,
    plans: null,
    join: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about");
        const data = await response.json();

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

  if (!sections.partners || !sections.plans || !sections.join) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className="block_tutor _container">
        <div className="companies_text">
          <p
            dangerouslySetInnerHTML={{ __html: sections.partners[0].content }}
          />
          <div className="companies_grid">
            <img src="companies/corsera.png" alt="Coursera" />
            <img src="companies/S600xU.webp" alt="Партнер" />
            <img src="companies/stepik.png" alt="Stepik" />
            <img src="companies/skillbox.png" alt="Skillbox" />
          </div>
        </div>
      </div>
      <div className="text_about_2 _container">
        <p dangerouslySetInnerHTML={{ __html: sections.plans[0].content }} />
        <div className="add_about">
          <div className="card_style blockthree_add">
            <div className="addblock_text2">
              <h1>{sections.join[0].title}</h1>
              <p
                dangerouslySetInnerHTML={{ __html: sections.join[0].content }}
              />
            </div>
            <Button text="попробовать" />
          </div>
        </div>
      </div>
    </>
  );
}
