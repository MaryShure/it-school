import "../main.css";

export default function Button({ text, link, type, onClick }) {
  return link ? (
    <a href={link} className="mainblock__button">
      {text}
    </a>
  ) : (
    <button
      type={type || "button"}
      className="mainblock__button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
