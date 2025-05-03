import Button from "../Button";
import "../../main.css";

export default function CurseCardWeb(props) {
  return (
    <>
      <div className="about">
        <div className="mainblock__body">
          <h1 className="mainblock__title _container">
            Полный курс по Web-разработке с нуля
          </h1>
          <div className="mainblock__buttons _container">
            <p>
              Научитесь создавать современные сайты и веб-приложения с
              использованием HTML, CSS, JavaScript и популярных фреймворков. От
              основ до продвинутых техник.
            </p>
          </div>
        </div>
      </div>
      <div className="card_curse_info">
        <div>
          <div className="card_style">
            <h1>Продолжительность курса</h1>
            <p>12 недель (60 часов видеоуроков)</p>
          </div>
          <div></div>
        </div>
        <div className="card_style">
          <h1>Рейтинг курса</h1>
          <div className="rating">
            <div className="star filled"></div>
            <div className="star filled"></div>
            <div className="star filled"></div>
            <div className="star filled"></div>
            <div className="star half-filled"></div>
            <p>4.9 (256 отзывов)</p>
          </div>
        </div>
        <div className="price_and_button">
          <div className="card_style">
            <h1>Цена курса</h1>
            <p>200 бел.руб.</p>
          </div>
          <Button text="записаться" link="/order" />
        </div>
        <p>#Популярные #Сертификат #Для начинающих</p>
      </div>
    </>
  );
}
