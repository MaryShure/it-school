import "../main.css";

export default function Humburger({ isOpen }) {
  return (
    <>
      <div className="humburger">
        <div className="burger burger1"></div>
        <div className="burger burger2"></div>
        <div className="burger burger3"></div>
      </div>

      <style jsx>{`
        .burger1 {
          transform: ${isOpen ? "rotate(47deg)" : "rotate(0)"};
        }
        .burger2 {
          transform: ${isOpen ? "translateX(200%)" : "translateX(0)"};
          opasity: ${isOpen ? 1 : 0};
        }
        .burger3 {
          transform: ${isOpen ? "rotate(-47deg)" : "rotate(0)"};
        }
      `}</style>
    </>
  );
}
