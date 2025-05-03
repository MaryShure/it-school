import React, { useRef } from "react";
import "../../main.css";

export default function Curses_Slide(props) {
  const scrollContainerRef = useRef(null);

  // Обработчики для touch-событий
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const container = scrollContainerRef.current;
    container.startX = touch.clientX;
    container.scrollLeftStart = container.scrollLeft;
    container.isDragging = true;
  };

  const handleTouchMove = (e) => {
    const container = scrollContainerRef.current;
    if (!container.isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const walk = (container.startX - touch.clientX) * 1.5;
    container.scrollLeft = container.scrollLeftStart + walk;
  };

  const handleTouchEnd = () => {
    scrollContainerRef.current.isDragging = false;
  };

  // Обработчики для mouse-событий
  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    container.startX = e.clientX;
    container.scrollLeftStart = container.scrollLeft;
    container.isDragging = true;
  };

  const handleMouseMove = (e) => {
    const container = scrollContainerRef.current;
    if (!container.isDragging) return;
    e.preventDefault();
    const walk = (container.startX - e.clientX) * 1.5;
    container.scrollLeft = container.scrollLeftStart + walk;
  };

  const handleMouseUp = () => {
    scrollContainerRef.current.isDragging = false;
  };

  const handleMouseLeave = () => {
    scrollContainerRef.current.isDragging = false;
  };

  return (
    <div className="page__mainblock mainblock _container">
      <h1 className="curses_slider_header">{props.text}</h1>
      <div
        className="curses_slide_block"
        ref={scrollContainerRef}
        // Touch events
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        // Mouse events
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </div>
    </div>
  );
}
