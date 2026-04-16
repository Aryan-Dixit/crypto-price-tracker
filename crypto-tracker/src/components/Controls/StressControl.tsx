import { useState, useEffect } from "react";
import styles from "./StressControl.module.css";

type Mode = "slow" | "normal" | "fast" | "extreme";

export default function StressControl() {
  const [mode, setMode] = useState<Mode>("normal"); //default normal

  const updateSpeed = async (selected: Mode) => {
    setMode(selected);

    let payload: any = {};

    if (selected === "slow") {
      payload = {
        all_trades: { min: 500, max: 1000 },
        l2_orderbook: { min: 800, max: 1500 },
        "v2/ticker": { min: 800, max: 1500 },
      };
    }

    if (selected === "normal") {
      payload = {
        all_trades: { min: 5, max: 20 },
        l2_orderbook: { min: 10, max: 40 },
        "v2/ticker": { min: 10, max: 50 },
      };
    }

    if (selected === "fast") {
      payload = {
        all_trades: { min: 2, max: 5 },
        l2_orderbook: { min: 5, max: 10 },
        "v2/ticker": { min: 5, max: 10 },
      };
    }

    if (selected === "extreme") {
      payload = {
        all_trades: { min: 1, max: 2 },
        l2_orderbook: { min: 2, max: 5 },
        "v2/ticker": { min: 2, max: 5 },
      };
    }

    try {
      const res = await fetch("http://localhost:3000/intervals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      console.log("Speed updated:", selected, json);
    } catch (err) {
      console.error("Failed to update intervals", err);
    }
  };

  // default "normal"
  useEffect(() => {
    updateSpeed("normal");
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.label}>Speed:</span>

      {(["slow", "normal", "fast", "extreme"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => updateSpeed(m)}
          className={`${styles.button} ${
            mode === m ? styles.active : ""
          }`}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
}