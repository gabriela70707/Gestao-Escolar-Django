import styles from './Menu.module.css';
import professorImagem from '../../assets/professores.png'
import disciplinaImagem from '../../assets/disciplinas.png'
import gestorImagem from '../../assets/gestor.png'
import ambienteImagem from '../../assets/ambiente.png'
import site from '../../assets/site.png'

export function Menu() {
    return (
        <div className={styles.container}>

            <div className={styles.icones}>

                    <div className={styles.professor}>
                        <img src={professorImagem} alt="Professores"/>
                        <div className={styles.text}>
                            <h2>Professores</h2>
                            <p>descrição: sdalskdjasjdlka dasdasdasdasdas</p>
                        </div>
                    </div>

                    <div className={styles.gestor}>
                        <img src={gestorImagem} alt="Gestores"/>
                        <div className={styles.text}>
                            <h2>Gestores</h2>
                            <p>descrição: sdalskdjasjdlka dasdasdasdasdas</p>
                        </div>
                    </div>

                    <div className={styles.disciplina}>
                    <img src={disciplinaImagem} alt="Disciplinas"/>
                        <div className={styles.text}>
                            <h2>Disciplinas</h2>
                            <p>descrição: sdalskdjasjdlka dasdasdasdasdas</p>
                        </div>
                    </div>

                    <div className={styles.disciplina}>
                    <img src={ambienteImagem} alt="Ambientes"/>
                        <div className={styles.text}>
                            <h2>Ambientes</h2>
                            <p>descrição: sdalskdjasjdlka dasdasdasdasdas</p>
                        </div>
                    </div>
            </div>

            <div className={styles.imagem}>
                <img src={site} alt="Garota com livro na mão"/>
            </div>
        
        </div>


    )
}