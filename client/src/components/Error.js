import "../main.css";
import Button from "./Button";

export default function Error() {
  return (
    <div className="error_block">
      <div className="error_img">
        <img src="./back_img/error.png" alt="Error" />
        <p>404 error</p>
      </div>
      страница не найдена или удалена
      <Button text="вернуться на главную" link="/" />
    </div>
  );
}
