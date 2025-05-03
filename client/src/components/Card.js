import "../main.css";

export default function Card(props) {
  const cardStyle = {
    ...(props.bg_img
      ? {
          backgroundImage: `url(${process.env.PUBLIC_URL + props.bg_img}`,
          backgroundSize: "cover",
        }
      : {}),
  };
  return (
    <div className="card_style" style={cardStyle}>
      <div className="card1_text">
        <p>{props.text}</p>
      </div>
    </div>
  );
}
