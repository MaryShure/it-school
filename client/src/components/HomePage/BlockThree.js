import "../../main.css";
import Button from "../Button";
import Slider from "../Slider";

import { createPortal } from "react-dom";

export default function BlockThree(props) {
  return (
    <div>
      <div className="card_style blockthree_add">
        <div className="addblock_text">
          <h1>
            Попробуйте <br /> <b>бесплатно</b>{" "}
          </h1>
          <p>
            Начальные консультации, чтобы узнать подходит ли вам направление
          </p>
          <Button text="попробовать" link="/error" />
        </div>
        <div className="addvideoblock">
          <div className="videoblure">
            <div className="play_sign"></div>
          </div>
          <img src="cards_img/web_dev.jpg" />
        </div>
      </div>
      <Slider />

      <div className="info_cards _container">
        <div className="info_card card_style">
          <p>Выпустилось студентов</p>
          <p>112,8k</p>
        </div>
        <div className="info_card card_style">
          <p>Доступно лекций</p>
          <p>212</p>
        </div>
        <div className="info_card card_style">
          <p>Популярное направление</p>
          <p>Wed-разработка</p>
        </div>
      </div>
    </div>
  );
}
