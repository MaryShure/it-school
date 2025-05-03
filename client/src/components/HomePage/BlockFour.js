import "../../main.css";
import Button from "../Button";

export default function BlockFour(props) {
  console.log(props);
  return (
    <>
      <div className="order">
        <h1>КАК МЫ РАБОТАЕМ</h1>
        <div className="order_style">
          <div className=" order_cards1">
            <div className="card_style order_card">
              <p>1</p>
              <p>Выбирайте курс</p>
            </div>
            <div className="card_style order_card">
              <p>2</p>
              <p>Учитесь у лучших</p>
            </div>
          </div>
          <div className=" order_cards1">
            <div className="card_style order_card">
              <p>3</p>
              <p>Выполняйте задания</p>
            </div>
            <div className="card_style order_card">
              <p>4</p>
              <p>Получайте сертификат</p>
            </div>
          </div>
        </div>
        <Button text="выбрать курс" link="/curses" />
      </div>
    </>
  );
}
