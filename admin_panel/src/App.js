import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Applications from "./pages/Applications";
import CoursesPage from "./pages/CoursesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import PublicationsPage from "./pages/PublicationsPage";
import AboutPageAdmin from "./pages/AboutPageAdmin";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/applications" element={<Applications />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/about-admin" element={<AboutPageAdmin />} />
            <Route path="/" element={<Applications />} />
          </Routes>
        </Layout>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
