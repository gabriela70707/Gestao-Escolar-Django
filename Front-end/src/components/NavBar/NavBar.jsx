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
                <p>Deseja Sair?</p>
                <button onClick={() => navigate("/")}>Sair</button>
            </nav>
        </>
    );
}
