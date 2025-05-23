import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import GestaoProfessores from "./pages/Professores/GestaoProfessores";
import GestaoGestores from "./pages/Gestores/GestaoGestores";
import GestaoAmbientes from "./pages/Ambientes/GestaoAmbiente";
import { NavBar } from "./components/NavBar/NavBar";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Content/Content";
import { Footer } from "./components/Footer/Footer";

// Rota protegida: bloqueia acesso se não houver token de login
function RotaProtegida({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RotaProtegida>
              <>
                <Header />
                <NavBar />
                <Content />
                <Footer />
              </>
            </RotaProtegida>
          }
        />
        <Route path="/professores" element={<GestaoProfessores />} />
        <Route path="/gestores" element={<GestaoGestores />} />
        <Route path="/ambientes" element={<GestaoAmbientes />} />
      </Routes>
    </Router>
  );
}

export default App;
