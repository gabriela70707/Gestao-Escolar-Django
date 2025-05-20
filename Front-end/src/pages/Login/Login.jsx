import { useState } from "react";
import axios from "axios";
import stylesLogin from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoLogin, setTipoLogin] = useState("gestor"); // Define se é login de gestor ou professor
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handleLogin foi chamado!"); // Verifica se a função está sendo executada

    // Verifica se os campos foram preenchidos
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password
      });

      console.log("Resposta do servidor:", response.data); // Exibe a resposta do backend

      const cargoBackend = response.data.cargo;
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("cargo", cargoBackend);

      console.log("Cargo do Backend:", cargoBackend);
      console.log("Tipo de Login Selecionado:", tipoLogin);

      // Verifica se o cargo do backend corresponde ao tipo de login escolhido
      if (cargoBackend !== tipoLogin) {
        alert("Você está tentando logar na área errada! Por favor, use a área correta.");
        localStorage.removeItem("accessToken"); // Remove token para evitar acessos indevidos
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
      <div className={`${stylesLogin.container} ${isActive ? stylesLogin.active : ""}`}>
        
        {/* Login de Gestor */}
        <div className={`${stylesLogin.formContainer} ${stylesLogin.gestor}`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Logar como Gestor(a)</h1>
            <span>Use seu nome de Usuário</span>
            <input type="text" placeholder="Nome de Usuário" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => { setTipoLogin("gestor"); handleLogin(); }}>Entrar</button>
          </form>
        </div>

        {/* Login de Professor */}
        <div className={`${stylesLogin.formContainer} ${stylesLogin.professor}`}>
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
            <div className={`${stylesLogin.togglePanel} ${stylesLogin.toggleLeft}`}>
              <h1>É professor(a)?</h1>
              <p>Clique no botão abaixo:</p>
              <button className={stylesLogin.hidden} onClick={() => { setIsActive(false); setTipoLogin("professor"); }}>Sou Professor</button>
            </div>
            <div className={`${stylesLogin.togglePanel} ${stylesLogin.toggleRight}`}>
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
