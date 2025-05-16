import { useState } from 'react';
import styles from './NavBar.module.css';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
                ☰
            </div>

            <nav className={`${styles.container} ${isOpen ? styles.open : styles.closed}`}>
                <ul>
                    <li>Escola</li>
                    <li>Missão</li>
                    <li>Visão</li>
                    <li>Valores</li>
                </ul>
                <button onClick={() => navigate("/")}>Sair</button>
            </nav>
        </>
    );
}
