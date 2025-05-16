import { useState } from "react";
import stylesLogin from './Login.module.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate()

  return (
    <div className={stylesLogin.main}>
        <div className={stylesLogin.container + (isActive ? " " + stylesLogin.active : "")}>
            
            <div className={stylesLogin.formContainer + " " + stylesLogin.gestor}>
                <form>
                    <h1>Logar como Gestor(a)</h1>
                    <span>Use seu nome de Usuário</span>
                    <input type="text" placeholder="Nome de Usuário" />
                    <input type="password" placeholder="Password" />
                    <button>Entrar</button>
                </form>
            </div>

            
            <div className={stylesLogin.formContainer + " " + stylesLogin.professor}>
                <form>
                    <h1>Logar como Professor(a)</h1>
                    <span>Use seu nome de Usuário</span>
                    <input type="text" placeholder="Nome de Usuário" />
                    <input type="password" placeholder="Password" />
                    <button onClick={() => navigate("/home")}>Entrar</button>
                </form>
            </div>

            
            <div className={stylesLogin.toggleContainer}>
                <div className={stylesLogin.toggle}>
                    <div className={stylesLogin.togglePanel + " " + stylesLogin.toggleLeft}>
                        <h1>É professor(a)?</h1>
                        <p>Clique no botão abaixo:</p>
                        <button className={stylesLogin.hidden} onClick={() => setIsActive(false)}>Sou Professor</button>
                    </div>
                    <div className={stylesLogin.togglePanel + " " + stylesLogin.toggleRight}>
                        <h1>É Gestor(a)?</h1>
                        <p>Clique no botão abaixo:</p>
                        <button className={stylesLogin.hidden} onClick={() => setIsActive(true)}>Sou Gestor</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;
