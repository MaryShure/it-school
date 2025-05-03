import Button from "../Button";
import "../../main.css";

export default function SecondBlog_Page(props) {
  return (
    <>
      <div className="card_style news ">
        <div className="main_news">
          <h2>Новый курс: Введение в искусственный интеллект</h2>
          <p>
            Изучите основы искусственного интеллекта с нашим новым курсом! Вы
            научитесь создавать нейронные сети, работать с Python и применять ИИ
            в реальных проектах. Курс подходит как для начинающих, так и для
            опытных программистов.
          </p>
          <p>12 октября 2024</p>
        </div>
        <div className="main_news">
          <p>Бесплатный вебинар: Как выбрать первый язык программирования</p>
          <p>10 октября 2024</p>
        </div>
        <div className="main_news">
          <p>Обновление курса по JavaScript: Новые уроки по React и Node.js</p>
          <p>5 октября 2024</p>
        </div>
      </div>
      <div className="ivents">
        <h1>Предстоящие мероприятия</h1>
        <div className="ivent_grid">
          <div className="ivent_text card_style">
            <h2>Мастер-класс: Введение в веб-разработку</h2>
            <p>
              Присоединяйтесь к нашему вебинару для новичков и начните создавать
              свои первые сайты!
            </p>
            <p>Дата: 25 ноября.</p>
          </div>
          <div className="ivent_text card_style">
            <h2>Q&A с экспертом по Data Science</h2>
            <p>
              Возможность задать вопросы о карьерных перспективах и инструментах
              анализа данных.
            </p>
            <p>Дата: 3 декабря.</p>
          </div>
        </div>
      </div>
      <div className="meeting">
        <div className="card_style blockthree_add">
          <div className="addblock_text">
            <h1>Выпуск ноября</h1>
            <p>
              Лучшие преподаватели, новые курсы и вдохновляющие истории
              студентов за этот месяц.
            </p>
            <Button text="перейти" />
          </div>
          <div className="addvideoblock">
            <div className="videoblure">
              <div className="play_sign"></div>
            </div>
            <img src="add_meeting.jpg" />
          </div>
        </div>
      </div>
    </>
  );
}
