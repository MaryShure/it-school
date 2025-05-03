import React from "react";
import { Link } from "react-router-dom";
import "../../main.css";

export default function CardMenu(props) {
  const cardStyle = {
    backgroundImage: props.bg_img
      ? `linear-gradient(135deg, rgba(221, 151, 99, 0), rgba(173, 73, 127, 1)), 
         url(${
           props.bg_img.startsWith("http")
             ? props.bg_img
             : `http://localhost:5000${props.bg_img}`
         })`
      : "linear-gradient(135deg, rgba(221, 151, 99, 0), rgba(173, 73, 127, 1))",
  };

  return (
    <Link to={props.href || "#"} className="card_menu_style" style={cardStyle}>
      <div className="card_menu_text">
        <p>{props.text}</p>
      </div>
    </Link>
  );
}
