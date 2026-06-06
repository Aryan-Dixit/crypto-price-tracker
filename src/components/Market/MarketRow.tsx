import React from "react";
import { useNavigate } from "react-router-dom";
import { useTicker } from "../../hooks/useTicker";
import { useFavoritesStore } from "../../store/useFavoritesStore";

import styles from "./MarketRow.module.css";

interface Props {
  symbol: string;
  name: string;
}

function MarketRow({ symbol, name }: Props) {
  const ticker = useTicker(symbol);
  const navigate = useNavigate();

  const { toggle, isFavorite } = useFavoritesStore();
  const fav = isFavorite(symbol);

  const price = ticker?.last_price ?? 0;
  const change = ticker?.change_24h ?? 0;

  return (
    <div
      className={styles.row}
      onClick={() => navigate(`/${symbol}`)}
    >
      {/* Star */}
      <span
        className={styles.star}
        onClick={(e) => {
          e.stopPropagation();
          toggle(symbol);
        }}
      >
        {fav ? "⭐" : "☆"}
      </span>

      {/* Name */}
      <div className={styles.nameContainer}>
        <div className={styles.symbol}>{symbol}</div>
        <div className={styles.subText}>{name}</div>
      </div>

      {/* Price */}
      <div className={styles.price}>
        ${price ? price.toFixed(2) : "-"}
      </div>

      {/* Change */}
      <div
        className={change > 0 ? styles.positive : styles.negative}
      >
        {ticker
          ? `${change > 0 ? "+" : ""}${change.toFixed(2)}%`
          : "-"}
      </div>

      {/* Volume */}
      <div className={styles.volume}>
        {ticker?.volume_24h?.toFixed?.(0) ?? "-"}
      </div>
    </div>
  );
}

export default React.memo(MarketRow);