import React, { useMemo } from "react";
import { useOrderBook } from "../../hooks/useOrderBook";
import { calculateDepth } from "../../utils/depth";

import styles from "./OrderBook.module.css";

interface Props {
  symbol: string;
}

interface Level {
  price: number;
  size: number;
  cumulative: number;
}

export default function OrderBook({ symbol }: Props) {
  const orderbook = useOrderBook(symbol);

  const bids = useMemo(
    () => calculateDepth(orderbook?.bids || []).slice(0, 6),
    [orderbook]
  );

  const asks = useMemo(
    () => calculateDepth(orderbook?.asks || []).slice(0, 6),
    [orderbook]
  );

  const maxBid = bids[bids.length - 1]?.cumulative || 1;
  const maxAsk = asks[asks.length - 1]?.cumulative || 1;

  return (
    <div className={styles.container}>
      <h3>Orderbook</h3>

      {/* Header */}
      <div className={styles.header}>
        <span>Price</span>
        <span>Size</span>
        <span>Total</span>
      </div>

      {/* Asks */}
      <div className={styles.list}>
        {asks
          .slice()
          .reverse()
          .map((level, i) => (
            <Row
              key={i}
              level={level}
              max={maxAsk}
              color="rgba(255,0,0,0.2)"
              type="ask"
            />
          ))}
      </div>

      {/* Spread */}
      <div className={styles.spread}>Spread</div>

      {/* Bids */}
      <div className={styles.list}>
        {bids.map((level, i) => (
          <Row
            key={i}
            level={level}
            max={maxBid}
            color="rgba(0,255,0,0.2)"
            type="bid"
          />
        ))}
      </div>
    </div>
  );
}

const Row = React.memo(function Row({
  level,
  max,
  color,
  type,
}: {
  level: Level;
  max: number;
  color: string;
  type: "ask" | "bid";
}) {
  const width = (level.cumulative / max) * 100;

  return (
    <div className={styles.row}>
      <div
        className={styles.depthBar}
        style={{
          width: `${width}%`,
          background: color,
        }}
      />

      <span className={`${type === "ask" ? styles.ask : styles.bid} ${styles.price}`}>
        {level.price.toFixed(2)}
      </span>

      <span>{level.size.toFixed(3)}</span>

      <span className={styles.total}>
        {level.cumulative.toFixed(3)}
      </span>
    </div>
  );
});