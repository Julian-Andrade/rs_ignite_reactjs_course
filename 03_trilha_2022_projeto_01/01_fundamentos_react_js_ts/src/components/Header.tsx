import styles from "./Header.module.css";
import iginiteLogo from "../assets/ignite-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={iginiteLogo} alt="Ignite Logo" />
    </header>
  );
}
