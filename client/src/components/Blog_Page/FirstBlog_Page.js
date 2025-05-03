import Button from "../Button";
import "../../main.css";

export default function FirstBlog_Page(props) {
  return (
    <>
      <div className="about">
        <div className="mainblock__body">
          <h1 className="mainblock__title _container">Новости и события </h1>
          <div className="mainblock__buttons _container">
            <p>
              Добро пожаловать в наш блог! Здесь вы найдете свежие новости
              платформы, анонсы событий и полезные материалы для вашего
              профессионального роста.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
