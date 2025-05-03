import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Button from "../Button";
import CardMenu from "./CardMenu";
import "../../main.css";

export default function FirstBlock_Curses(props) {
  const [popularCourses, setPopularCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState({
    popular: true,
    search: false,
  });
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [cookies, setCookie] = useCookies(["searchQuery"]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.searchQuery) {
      setSearchInput(cookies.searchQuery);
      handleSearch(cookies.searchQuery, false);
    }

    const fetchPopularCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/top-courses");
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const data = await response.json();
        if (!data.success)
          throw new Error(data.error || "Не удалось загрузить курсы");

        setPopularCourses(
          data.data.map((course) => ({
            ...course,
            cover_url: course.cover_url
              ? `http://localhost:5000${course.cover_url}`
              : "/default_course.jpg",
          }))
        );
      } catch (error) {
        console.error("Ошибка при загрузке курсов:", error);
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, popular: false }));
      }
    };

    fetchPopularCourses();
  }, []);

  const handleSearch = async (query = searchInput.trim()) => {
    const searchQuery = query || searchInput.trim();
    if (!searchQuery) return;

    try {
      setLoading((prev) => ({ ...prev, search: true }));
      setShowResults(false);

      const response = await fetch(
        `http://localhost:5000/api/courses/search?query=${encodeURIComponent(
          searchQuery
        )}&limit=3`
      );

      if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Ошибка поиска");

      setSearchResults(
        data.data.slice(0, 3).map((course) => ({
          ...course,
          image_url: course.cover_url
            ? `http://localhost:5000${course.cover_url}`
            : "/default_course_image.jpg",
        }))
      );

      setCookie("searchQuery", searchQuery, { path: "/" });
      setShowResults(true);

      // Плавная прокрутка к результатам
      setTimeout(() => {
        const element = document.getElementById("search-results-block");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (error) {
      console.error("Ошибка поиска:", error);
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, search: false }));
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchResults([]);
    setShowResults(false);
    setCookie("searchQuery", "", { path: "/", expires: new Date(0) });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading.popular) return <div className="loading">Загрузка курсов...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <>
      <div className="mainblock__body">
        <h1 className="mainblock__title _container">Каталог курсов</h1>
        <p>Откройте для себя мир программирования</p>
        <div className="mainblock__buttons _container">
          <input
            id="curses_teg_input"
            className="footer_input"
            placeholder="#популярное"
            aria-label="Поиск по тегам"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button text="найти" onClick={() => handleSearch()} />
        </div>
      </div>

      <div id="search-results-block" className="blocktwo _container">
        <div className="blocktwo_cardsgrid">
          {showResults ? (
            <>
              {searchResults.length > 0 && (
                <div className="search-results-header">
                  <h1 class="mb-5">Результаты поиска:</h1>
                  <Button
                    text="очистить результаты"
                    onClick={handleClearSearch}
                    className="clear-results-button"
                  />
                </div>
              )}

              {loading.search ? (
                <div className="loading">Поиск курсов...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <CardMenu
                    key={course.id}
                    text={course.title}
                    bg_img={course.image_url}
                    href={`/courses/${course.id}`}
                  />
                ))
              ) : (
                <div className="no-results-wrapper items-center">
                  <p className="no-courses-message">Ничего не найдено</p>
                  <div
                    className="search-suggestions"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p class="m-1.5">
                      Попробуйте изменить запрос или посмотрите наши популярные
                      курсы:
                    </p>
                    <Button text="показать ТОП 3" onClick={handleClearSearch} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h1>ТОП-3 самых популярных курса:</h1>
              {popularCourses.length > 0 ? (
                popularCourses
                  .slice(0, 3)
                  .map((course) => (
                    <CardMenu
                      key={course.id}
                      text={course.title}
                      bg_img={course.cover_url}
                      href={`/courses/${course.id}`}
                    />
                  ))
              ) : (
                <p className="no-courses-message">Нет рекомендуемых курсов</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
