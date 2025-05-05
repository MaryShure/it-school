export default function WebCardDecorator() {
  return (
    <div className="bottom_img">
      <div className="mainblock__image _ibg">
        <img
          src={`${process.env.PUBLIC_URL}/back_img/image_web_curse.png`}
          alt="Course background"
        />
      </div>
    </div>
  );
}
