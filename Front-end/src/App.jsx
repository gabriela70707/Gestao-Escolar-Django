import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login"
import { NavBar } from './components/NavBar/NavBar';
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <>
              <Header />
              <NavBar />
              <Content />
              <Footer />
            </>
          } />
        </Routes>
    </Router>
  );
}

export default App;