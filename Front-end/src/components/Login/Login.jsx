import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home"); 
  };

  return (
    <div className={styles.container}>
        <div className={styles.form-container + styles.professor}>
            <form>
                    <h1>Gestor</h1>
                    <input type="text" placeholder="Nome Usuario"/>
                    <input type="text" placeholder="Senha"/>
                    <button>Professor</button>
                </form>
        </div>

        <div className={styles.form-container + styles.gestor}>
                 <form>
                    <h1>Professor</h1>
                    <input type="text" placeholder="Nome Usuario"/>
                    <input type="text" placeholder="Senha"/>
                    <button>Gestor</button>
                </form>
        </div>

        <div className={styles.toggle-container}>
            <div className={styles.toggle}>
                <div className={styles.toogle-panel + styles.toggle-left}>
                    <h1>Bem-Vindo Gestor(a)</h1>
                    <p>ajdlasjdlaksjdlasjdlasdjasldj</p>
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>


        <div className={styles.toggle-container}>
            <div className={styles.toggle}>
                <div className={styles.toogle-panel + styles.toggle-right}>
                    <h1>Bem-Vindo Professor(a)</h1>
                    <p>ajdlasjdlaksjdlasjdlasdjasldj</p>
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </div>
        </div>


    </div>
  );
}

export default Login;
