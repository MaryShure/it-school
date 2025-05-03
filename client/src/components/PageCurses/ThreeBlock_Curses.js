import Button from "../Button";
import "../../main.css";

export default function ThreeBlock_Curses(props) {
  return (
    <>
      <div className="card_style blockthree_add ">
        <div className="addblock_text2">
          <h1>Если вам трудно определится мы поможем</h1>
          <p>
            Первая консультация <b>бесплатно</b>
          </p>
        </div>
        <Button text="попробовать" />
      </div>
    </>
  );
}
