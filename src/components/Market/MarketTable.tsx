import type { SymbolInfo } from "../../constants/symbols";
import MarketRow from "./MarketRow";

interface Props {
  data: SymbolInfo[];
}

export default function MarketTable({ data }: Props) {
  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1.5fr 1fr 1fr 1fr",
          padding: "10px",
          fontWeight: "bold",
          borderBottom: "2px solid #ddd",
        }}
      >
        <span></span>
        <span>Name</span>
        <span>Price</span>
        <span>24h Change</span>
        <span>Volume</span>
      </div>

      {/* Rows */}
      {data.map((item) => (
        <MarketRow
          key={item.symbol}
          symbol={item.symbol}
          name={item.name}
        />
      ))}
    </div>
  );
}