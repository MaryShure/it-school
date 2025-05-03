import "../main.css";
import Button from "./Button";

export default function Add(props) {
  console.log(props);
  return (
    <>
      <div className="blog_add">
        <div className="mainblock__container _container ">
          <div className="card_style blockthree_add  ">
            <div className="addblock_text2">
              <h1>
                <b>Бесплатная</b> консультация
              </h1>
              <p>
                Первая консультация <b>бесплатно</b>
              </p>
            </div>
            <Button text="попробовать" />
          </div>
        </div>
      </div>
    </>
  );
}
