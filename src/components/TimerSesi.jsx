import { useState, useEffect } from "react";
import styles from "./TimerSesi.module.css";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const menit = String(Math.floor(detik / 60)).padStart(2, "0");
  const sisaDetik = String(detik % 60).padStart(2, "0");

  return (
    <p className={styles.timer}>
      Lama sesi <strong>{menit}:{sisaDetik}</strong>
    </p>
  );
}