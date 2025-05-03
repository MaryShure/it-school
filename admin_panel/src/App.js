import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Applications from "./pages/Applications";
import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/applications" element={<Applications />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/" element={<Applications />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
