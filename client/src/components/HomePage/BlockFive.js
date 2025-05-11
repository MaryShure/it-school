import "../../main.css";
import Button from "../Button";
import { useEffect, useState } from "react";

export default function BlockFive(props) {
  console.log(props);

  const [publications, setPublications] = useState({
    news: [],
    events: [],
    featured: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/publications/published"
        );
        if (!response.ok) throw new Error("Ошибка загрузки публикаций");
        const data = await response.json();

        // Сортируем новости по дате публикации (новые сначала)
        const sortedNews = data.data
          .filter((p) => p.type === "news")
          .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

        // Берем только 2 последние новости
        const latestNews = sortedNews.slice(0, 2);

        // Находим последний featured выпуск
        const featured = data.data
          .filter((p) => p.type === "featured")
          .sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          )[0];

        setPublications({
          news: latestNews, // Используем только 2 последние новости
          events: data.data.filter((p) => p.type === "event"),
          featured: featured || null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <>
      <div className="card_style blockthree_add">
        <div className="addblock_text2">
          <h1>Если вам трудно определится мы поможем</h1>
          <p>
            Первая консультация <b>бесплатно</b>
          </p>
        </div>
        <Button
          text={
            <>
              {`Получить`}
              <br />
              {`консультацию`}
            </>
          }
        />
      </div>
      <div className="card_style news">
        {publications.news.map((item, index) => (
          <div className="main_news" key={`news-${index}`}>
            <h2>{item.title}</h2>
            <p>{item.excerpt || item.content.substring(0, 150)}...</p>
            <p>{new Date(item.published_at).toLocaleDateString()}</p>
          </div>
        ))}
        <Button text="перейти в блог" link="/blog" />
      </div>
    </>
  );
}
