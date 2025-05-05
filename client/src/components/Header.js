import "../main.css";
// import "../index.css";
import React, { useState, useEffect } from "react";
import Humburger from "./Humburger";
import { Link } from "react-router-dom";

export default function Header(props) {
  const [humburgerOpen, setHumburgerOpen] = useState(false);
  const toggelHumburger = () => {
    setHumburgerOpen(!humburgerOpen);
  };

  const [humburgerIsRendered, sethumburgerIsRendered] = useState(false);

  const handleTransitionEnd = () => {
    sethumburgerIsRendered(humburgerOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__container _container">
          <Link to="/">
            <img
              className="header__logo"
              src={`${process.env.PUBLIC_URL}/logo_try.png`}
              alt="Логотип сайта"
            />
          </Link>
          <nav className="header__menu menu">
            <ul className="menu__list">
              {props.items.map((item, i) => {
                const linkPath =
                  item === "Наш блог"
                    ? "/blog"
                    : item === "О платформе"
                    ? "/about"
                    : item === "Направления"
                    ? "/curses"
                    : "/";
                return (
                  <li className="menu__item" key={i}>
                    <Link to={linkPath} className="menu__link">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div onClick={toggelHumburger} className="z-50">
            <Humburger isOpen={humburgerOpen} />
          </div>
        </div>
        <div>
          <ul
            className={
              humburgerOpen ? "humburger_menu visible" : "humburger_menu"
            }
            onTransitionEnd={humburgerOpen ? () => {} : handleTransitionEnd}
          >
            <ul className="humburder_menu__list">
              {props.items.map((item, i) => {
                const linkPath =
                  item === "Наш блог"
                    ? "/blog"
                    : item === "О платформе"
                    ? "/about"
                    : item === "Направления"
                    ? "/curses"
                    : "/";
                return (
                  <li className="humburger_menu__item" key={i}>
                    <Link to={linkPath} className="menu__link">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ul>
        </div>
      </header>

      <style jsx>{`
        .humburger_menu {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .humburger_menu.visible {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </>
  );
}
