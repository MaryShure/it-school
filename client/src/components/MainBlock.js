function MainBlock({ children, ind, noMargin }) {
  console.log({ children, ind, noMargin });
  return (
    <main className={`page ${noMargin ? "no-margin" : ""}`}>
      {children[0]}
      <div
        className="mainblock__image _ibg"
        id={`mainblock-decorator-${ind}`}
      ></div>
      <div className="page__mainblock mainblock _container">
        <div className="mainblock__container">{children[1] || children}</div>
      </div>
    </main>
  );
}

export default MainBlock;
