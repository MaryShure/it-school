import Button from "../Button";
import "../../main.css";

export default function FirstText_About(props) {
  return (
    <>
      <div className="about">
        <div className="mainblock__body">
          <h1 className="mainblock__title _container">О нашей платформе </h1>
          <div className="mainblock__buttons _container">
            <p>
              Наша онлайн-платформа для обучения программированию предоставляет
              качественные курсы для студентов любого уровня — от новичков до
              профессионалов.
            </p>
          </div>
        </div>
        <div className="text_about_2 _container">
          <p>
            Мы начали в <b>2018 году</b> с небольшого проекта по обучению
            школьников основам программирования.
          </p>
          <p>
            Сегодня мы предлагаем <b>более 100</b> курсов по разным языкам
            программирования и технологиям, сотрудничая с огромным количеством
            школ программирования.
          </p>
        </div>
        <div className="text_about_2 _container">
          <p>
            <b>Наша миссия</b> — сделать обучение программированию доступным для
            всех.
          </p>
          <p>
            Мы ставим перед собой цель предоставить студентам удобные и
            эффективные инструменты для достижения их карьерных целей.
          </p>
          <div className="card_style values">
            <h2>Наши ключевые ценности</h2>
            <ul className=" about_ul">
              <li>Качество</li>
              <li>Доступность</li>
              <li>Огромное разнообразие</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
