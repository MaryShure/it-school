import "../main.css";
import Button from "./Button";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const handleFooterLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer_block_contact">
        <Link onClick={handleFooterLinkClick} to="/">
          <img
            className="header__logo"
            src={process.env.PUBLIC_URL + "logo_try_white.png"}
            alt="Логотип сайта"
          />
        </Link>
        <div>
          <p className="footer_titel">Меню навигации:</p>
          <div className="footer_list">
            <a href="/">Главная</a>
            <a href="/curses">Каталог курсов</a>
            <a href="/about">О компании</a>
            <a href="/blog">Блог</a>
          </div>
        </div>
        <div>
          <p className="footer_titel">Контактная информация:</p>
          <div className="footer_list">
            <a>+7 (495) 123-45-67</a>
            <a>support@platforma.ru</a>
            <a>Минск, ул. Программистов, д. 10</a>
            <a>Пн-Пт с 9:00 до 18:00</a>
          </div>
        </div>
        <div className="footer_iconlist">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-telegram" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <div className="_container">
        <p>
          Подпишитесь на нашу рассылку и получайте новости о новых курсах и
          акциях
        </p>
        <div className="footer_container ">
          <input
            id="footer_input_email"
            className="footer_input"
            placeholder="email@.email"
          ></input>
          <Button text="подписаться" />
        </div>
      </div>
      <div className="footer_arrow_up" onClick={handleFooterLinkClick}>
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
      </div>
      <p className="footer_transparent _container">
        © 2024 Онлайн-платформа. Все права защищены.
      </p>
    </footer>
  );
}
