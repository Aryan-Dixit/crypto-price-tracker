import { useTrades } from "../../hooks/useTrades";

export default function Trades({ symbol }: { symbol: string }) {
  const trades = useTrades(symbol);

  return (
    <div>
      <h3>Recent Trades</h3>

      <div style={headerStyle}>
        <span>Price</span>
        <span>Size</span>
        <span>Side</span>
      </div>

      <div style={{ maxHeight: "450px", overflow: "auto" }}>
        {trades.map((trade, i) => {
          const side = trade.side || "buy";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: side === "buy" ? "green" : "red",
                padding: "2px 6px",
                background:
                  i === 0 ? "rgba(255,255,0,0.2)" : "transparent",
              }}
            >
              <span>{trade.price}</span>
              <span>{trade.size}</span>
              <span>{side.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "bold",
};