import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./main.css";
import "./index.css";
import Header from "./components/Header";
import MainBlock from "./components/MainBlock";
import IndexBody from "./components/HomePage/IndexBody";
import Footer from "./components/Footer";
import BlockTwo from "./components/HomePage/BlockTwo";
import BlockThree from "./components/HomePage/BlockThree";
import BlockFour from "./components/HomePage/BlockFour";
import BlockFive from "./components/HomePage/BlockFive";
import ThreeBlock_Curses from "./components/PageCurses/ThreeBlock_Curses";
import FirstText_About from "./components/AboutPage/FirstText_About";
import SecondText_About from "./components/AboutPage/SecondText_About";
import FirstBlock_Curses from "./components/PageCurses/FirstBlock_Curses";
import FirstBlog_Page from "./components/Blog_Page/FirstBlog_Page";
import SecondBlog_Page from "./components/Blog_Page/SecondBlog_Page";
import Add from "./components/Add";
import OrderForm from "./components/Order/OrderForm";
import Error from "./components/Error";
import CoursesList from "./components/PageCurses/CoursesList";
import CourseDetails from "./components/PageCurses/CourseDetails";

import BlockOneDecorator from "./components/back_blocks_img/BlockOneDecorator";
import BlockTwoDecorator from "./components/back_blocks_img/BlockTwoDecorator";
import BlockThreeDecorator from "./components/back_blocks_img/BlockThreeDecorator";
import BlockFourDecorator from "./components/back_blocks_img/BlockFourDecorator";
import BlockFiveDecorator from "./components/back_blocks_img/BlockFiveDecorator";
import CursesFirstDecorator from "./components/back_blocks_img/CursesFirstDecorator";
import CursesAddDecorator from "./components/back_blocks_img/CursesAddDecorator";
import AboutPageDecorator from "./components/back_blocks_img/AboutPageDecorator";
import AboutTwoPageDecorator from "./components/back_blocks_img/AboutTwoPageDecorator";
import BlogPageDecorator from "./components/back_blocks_img/BlogPageDecorator";
import BlogPageTwoDecorator from "./components/back_blocks_img/BlogPageTwoDecorator";
import WebCardDecorator from "./components/back_blocks_img/WebCardDecorator";
import OrderFormBlockDecorator from "./components/back_blocks_img/OrderFormBlockDecorator";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="wrapper ">
              <Header items={["Наш блог", "О платформе", "Направления"]} />
              <MainBlock ind={1}>
                <BlockOneDecorator />
                <IndexBody ind={1} />
              </MainBlock>
              <MainBlock ind={2}>
                <BlockTwoDecorator />
                <BlockTwo ind={2} />
              </MainBlock>
              <MainBlock ind={3}>
                <BlockThreeDecorator />
                <BlockThree ind={3} />
              </MainBlock>
              <MainBlock ind={4}>
                <BlockFourDecorator />
                <BlockFour ind={4} />
              </MainBlock>
              <MainBlock ind={5}>
                <BlockFiveDecorator />
                <BlockFive ind={5} />
              </MainBlock>
              <Footer />
            </div>
          }
        />
        <Route
          path="/curses"
          element={
            <div className="wrapper ">
              <Header items={["Главная", "Наш блог", "О платформе"]} />
              <MainBlock ind={1}>
                <CursesFirstDecorator />
                <FirstBlock_Curses ind={1} />
              </MainBlock>
              <CoursesList />
              <MainBlock ind={2} noMargin={true}>
                <CursesAddDecorator />
                <ThreeBlock_Curses ind={2} />
              </MainBlock>
              <Footer />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div className="wrapper ">
              <Header items={["Главная", "Направления", "О платформе"]} />
              <MainBlock ind={1}>
                <BlogPageDecorator />
                <FirstBlog_Page ind={1} />
              </MainBlock>
              <MainBlock ind={2}>
                <BlogPageTwoDecorator />
                <SecondBlog_Page ind={2} />
              </MainBlock>
              <Add />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="wrapper ">
              <Header items={["Главная", "Направления", "Наш блог"]} />
              <MainBlock ind={1}>
                <AboutPageDecorator />
                <FirstText_About ind={1} />
              </MainBlock>
              <MainBlock ind={2}>
                <AboutTwoPageDecorator />
                <SecondText_About ind={2} />
              </MainBlock>
              <Footer />
            </div>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <div className="wrapper ">
              <Header items={["Главная", "Направления", "Наш блог"]} />
              <MainBlock ind={1} noMargin={true}>
                <WebCardDecorator />
                <CourseDetails ind={1} />
              </MainBlock>
              <Footer />
            </div>
          }
        />
        <Route
          path="/order"
          element={
            <div className="wrapper ">
              <Header
                items={["Главная", "О платформе", "Наш блог", "Направления"]}
              />
              <MainBlock ind={1} noMargin={true}>
                <OrderFormBlockDecorator />
                <OrderForm ind={1} />
              </MainBlock>
              <Footer />
            </div>
          }
        />
        <Route
          path="/error"
          element={
            <div className="wrapper ">
              <Error />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
