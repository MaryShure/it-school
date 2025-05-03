import Button from "../Button";
import "../../main.css";

import { createPortal } from "react-dom";

export default function IndexBody(props) {
  return (
    <>
      <div className="mainblock__body">
        <h1 className="mainblock__title _container">
          ОНЛАЙН-ПЛАТФОРМА ПО ОБУЧЕНИЮ ПРОГРАММИРОВАНИЮ
        </h1>
        <div className="mainblock__buttons _container">
          <Button text="узнать больше" link="/about" />
          <Button text="выбрать курс" link="/curses" />
        </div>
      </div>
    </>
  );
}
