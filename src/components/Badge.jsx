import styles from "./Badge.module.css";

export default function Badge({ children, habis = false }) {
  return (
    <span className={`${styles.badge} ${habis ? styles.badgeHabis : ""}`}>
      {children}
    </span>
  );
}