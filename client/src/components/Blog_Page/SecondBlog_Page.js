import { useEffect, useState } from "react";
import Button from "../Button";
import "../../main.css";

export default function SecondBlog_Page() {
  const [publications, setPublications] = useState({
    news: [],
    events: [],
    featured: null, // Теперь храним только один featured выпуск
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

        // Находим последний выпуск месяца
        const featured = data.data
          .filter((p) => p.type === "featured")
          .sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          )[0];

        setPublications({
          news: data.data.filter((p) => p.type === "news"),
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
      {/* Новости */}
      <div className="card_style news">
        {publications.news.map((item, index) => (
          <div className="main_news" key={`news-${index}`}>
            <h2>{item.title}</h2>
            <p>{item.excerpt || item.content.substring(0, 150)}...</p>
            <p>{new Date(item.published_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Мероприятия */}
      <div className="ivents">
        <h1>Предстоящие мероприятия</h1>
        <div className="ivent_grid">
          {publications.events.map((event, index) => (
            <div className="ivent_text card_style" key={`event-${index}`}>
              <h2>{event.title}</h2>
              <p>{event.excerpt || event.content.substring(0, 100)}...</p>
              <p>Дата: {new Date(event.event_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Выпуск месяца - теперь проверяем featured !== null */}
      {publications.featured && (
        <div className="meeting">
          <div className="card_style blockthree_add">
            <div className="addblock_text">
              <h1>{publications.featured.title}</h1>
              <p>
                {publications.featured.excerpt ||
                  publications.featured.content.substring(0, 200)}
              </p>
              <Button text="перейти" />
            </div>
            <div className="addvideoblock">
              <div className="videoblure">
                <div className="play_sign"></div>
              </div>
              {publications.featured.cover_url ? (
                <img
                  src={`http://localhost:5000${publications.featured.cover_url}`}
                  alt={publications.featured.title}
                />
              ) : (
                <img src="add_meeting.jpg" alt="Заглушка" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
