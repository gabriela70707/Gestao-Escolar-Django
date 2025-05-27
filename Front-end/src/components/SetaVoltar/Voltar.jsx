import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"; // 🚀 Importação do Link
import Seta from "../../assets/seta-esquerda.png"
import styles from './Voltar.module.css';

export function Voltar() {

    return (
        <>
            <nav>
                <Link to="/home">
                    <img className={styles.seta} src={Seta} alt="" />
                </Link>
            </nav>
        </>
    );
}
