import "../../main.css";
import Button from "../Button";

export default function BlockFive(props) {
  console.log(props);
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
        <Button text="перейти в блог" link="/blog" />
      </div>
    </>
  );
}
