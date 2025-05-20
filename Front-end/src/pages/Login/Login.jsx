import { useState } from "react";
import axios from "axios";
import stylesLogin from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoLogin, setTipoLogin] = useState("gestor"); // Controla o tipo de login (Gestor ou Professor)
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password
      });

      const cargoBackend = response.data.cargo; // Obtém o cargo retornado pelo backend
      localStorage.setItem("accessToken", response.data.access); // Salva token
      localStorage.setItem("cargo", cargoBackend); // Salva cargo do usuário

      console.log("Cargo do Backend:", cargoBackend);
      console.log("Tipo de Login Selecionado:", tipoLogin);

      // Verifica se o cargo do backend corresponde ao tipo de login escolhido
      if (cargoBackend !== tipoLogin) {
        alert("Você está tentando logar na área errada! Por favor, use a área correta.");
        return;
      }

      // Redireciona para a página home após login bem-sucedido
      navigate("/home");

    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao logar! Verifique seu usuário e senha.");
    }
  };

  return (
    <div className={stylesLogin.main}>
      <div className={stylesLogin.container + (isActive ? " " + stylesLogin.active : "")}>
        
        {/* Login de Gestor */}
        <div className={stylesLogin.formContainer + " " + stylesLogin.gestor}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Logar como Gestor(a)</h1>
            <span>Use seu nome de Usuário</span>
            <input type="text" placeholder="Nome de Usuário" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => { setTipoLogin("gestor"); handleLogin(); }}>Entrar</button>
          </form>
        </div>

        {/* Login de Professor */}
        <div className={stylesLogin.formContainer + " " + stylesLogin.professor}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Logar como Professor(a)</h1>
            <span>Use seu nome de Usuário</span>
            <input type="text" placeholder="Nome de Usuário" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => { setTipoLogin("professor"); handleLogin(); }}>Entrar</button>
          </form>
        </div>

        {/* Alternador de Login */}
        <div className={stylesLogin.toggleContainer}>
          <div className={stylesLogin.toggle}>
            <div className={stylesLogin.togglePanel + " " + stylesLogin.toggleLeft}>
              <h1>É professor(a)?</h1>
              <p>Clique no botão abaixo:</p>
              <button className={stylesLogin.hidden} onClick={() => { setIsActive(false); setTipoLogin("professor"); }}>Sou Professor</button>
            </div>
            <div className={stylesLogin.togglePanel + " " + stylesLogin.toggleRight}>
              <h1>É Gestor(a)?</h1>
              <p>Clique no botão abaixo:</p>
              <button className={stylesLogin.hidden} onClick={() => { setIsActive(true); setTipoLogin("gestor"); }}>Sou Gestor</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
