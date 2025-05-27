import styles from './Menu.module.css';
import { Link } from "react-router-dom"; // 🚀 Importação do Link
import professorImagem from '../../assets/professores.png'
import disciplinaImagem from '../../assets/disciplinas.png'
import gestorImagem from '../../assets/gestor.png'
import ambienteImagem from '../../assets/ambiente.png'
import site from '../../assets/site.png'

export function Menu() {
    return (
        <div className={styles.container}>

            <div className={styles.icones}>

                {/* Link para a página de Gestão de Professores */}
                <Link to="/professores" className={styles.professor}>
                    <img src={professorImagem} alt="Professores"/>
                    <div className={styles.text}>
                        <h2>Professores</h2>
                        <p>Descrição: Visualizar Informações dos professores(as)</p>
                    </div>
                </Link>

                <Link to="/gestores" className={styles.gestor}>
                    <img className={styles.Imagem} src={gestorImagem} alt="Gestores"/>
                    <div className={styles.text}>
                        <h2>Gestores</h2>
                        <p>Descrição: Visualizar Informações dos gestores(as)</p>
                    </div>
                </Link>

                <Link to="/disciplinas" className={styles.disciplina}>
                    <img src={disciplinaImagem} alt="Disciplinas"/>
                    <div className={styles.text}>
                        <h2>Disciplinas</h2>
                        <p>Descrição: Visualizar Informações das Disciplinas</p>
                    </div>
                </Link>

                <Link to="/ambientes" className={styles.ambiente}>
                    <img className={styles.Imagem} src={ambienteImagem} alt="Ambientes"/>
                    <div className={styles.text}>
                        <h2>Ambientes</h2>
                        <p>Descrição: Visualizar Informações das Reservas de Ambiente</p>
                    </div>
                </Link>



            </div>

            <div className={styles.imagem}>
                <img src={site} alt="Garota com livro na mão"/>
            </div>

        </div>
    );
}
