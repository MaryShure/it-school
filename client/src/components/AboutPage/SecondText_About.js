import React, { useState, useEffect } from "react";
import Button from "../Button";
import "../../main.css";

export default function SecondText_About(props) {
  return (
    <>
      <div className="block_tutor _container">
        <div className="companies_text">
          <p>
            Мы работаем только с проверенными платформами и сервисами, чтобы вы
            получали доступ к лучшим ресурсам для обучения и профессионального
            роста. Вот некоторые из наших партнёров:
          </p>
          <div className="companies_grid">
            <img src="companies/corsera.png" />
            <img src="companies/S600xU.webp" />
            <img src="companies/stepik.png" />
            <img src="companies/skillbox.png" />
          </div>
        </div>
      </div>
      <div className="text_about_2 _container">
        <p>
          В ближайшие годы мы планируем расширить нашу платформу, предложив
          больше курсов на иностранных языках и открыть новые направления, такие
          как разработка мобильных приложений и машинное обучение.
        </p>
        <div className="add_about">
          <div className="card_style blockthree_add ">
            <div className="addblock_text2">
              <h1>Присоединяйтесь </h1>
              <p>
                Можно выбрать курс по интересам или попробовать консультацию{" "}
                <b>бесплатно</b>
              </p>
            </div>
            <Button text="попробовать" />
          </div>
        </div>
      </div>
    </>
  );
}
