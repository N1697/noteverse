import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNotes from "./pages/MyNotes/MyNotes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewNote from "./pages/NewNote/NewNote";
import EditNote from "./pages/EditNote/EditNote";
import { useState } from "react";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const [search, setSearch] = useState("");
  //The search bar of the Header will set the 'search' state
  //and MyNotes will use the 'search' state to filter
  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
          <Route path="/register" element={<RegisterPage />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} exact />
          <Route path="/createNote" element={<NewNote />} exact />
          <Route path="/note/:id" element={<EditNote />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="*" element={<PageNotFound />} exact />
        </Routes>
      </main>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
