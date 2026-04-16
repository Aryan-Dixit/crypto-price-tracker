import { useParams, useNavigate } from "react-router-dom";
import { useTicker } from "../hooks/useTicker";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useSocketStatus } from "../hooks/useSocketStatus";
import { socketManager } from "../services/socketManager";

import OrderBook from "../components/OrderBook/OrderBook";
import Trades from "../components/Trades/Trades";
import PriceChart from "../components/Chart/PriceChart";

import styles from "./DetailPage.module.css";

export default function DetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const ticker = useTicker(symbol || "");
  const { toggle, isFavorite } = useFavoritesStore();

  const status = useSocketStatus();

  if (!symbol) return null;

  const fav = isFavorite(symbol);
  const change = ticker?.change_24h ?? 0;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button onClick={() => navigate("/")}>← Back</button>

          <div>
            <div className={styles.symbol}>{symbol}</div>
            <div className={styles.subText}>
              {symbol.replace("USD", "")} Perpetual
            </div>
          </div>
        </div>

        <span onClick={() => toggle(symbol)} style={{ cursor: "pointer" }}>
          {fav ? "⭐" : "☆"}
        </span>
      </div>

      {/* PRICE */}
      <div className={styles.priceSection}>
        <div className={styles.price}>
          ${ticker?.last_price?.toFixed(2) ?? "-"}
        </div>

        <div className={change > 0 ? styles.positive : styles.negative}>
          {ticker
            ? `${change > 0 ? "+" : ""}${change.toFixed(2)}%`
            : "-"}
        </div>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <Stat label="Mark" value={ticker?.last_price} />
        <Stat label="24H High" value={ticker?.last_price} />
        <Stat label="24H Low" value={ticker?.last_price} />
        <Stat label="Volume" value={ticker?.volume_24h} />
        <Stat label="Funding" value={ticker?.funding_rate} />
      </div>

      {/* MAIN */}
      <div className={styles.main}>
        <div className={`${styles.panel} ${styles.divider}`}>
          <div className={styles.panelContent}>
            <OrderBook symbol={symbol} />
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <Trades symbol={symbol} />
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className={styles.chartContainer}>
        <div className={styles.chartTitle}>Mini Price Chart</div>
        <PriceChart symbol={symbol} />
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        {status === "connected" && "WebSocket connected · Live updates active"}

        {status === "connecting" && "Connecting to live data..."}

        {status === "disconnected" && 
            <div>
                Disconnected <button onClick={() => socketManager.connect()}>Retry</button>
            </div>
        }
     </div>
    </div>
  );
}

function Stat({ label, value }: any) {
  return (
    <div>
      <div style={{ fontSize: "10px", color: "#666" }}>{label}</div>
      <div>{value ? `$${Number(value).toFixed(2)}` : "-"}</div>
    </div>
  );
}