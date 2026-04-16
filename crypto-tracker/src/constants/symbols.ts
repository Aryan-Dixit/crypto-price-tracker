export interface SymbolInfo {
  symbol: string;
  name: string;
}

export const SYMBOLS: SymbolInfo[] = [
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "XRPUSD", name: "Ripple" },
  { symbol: "SOLUSD", name: "Solana" },
  { symbol: "PAXGUSD", name: "PAX Gold" },
  { symbol: "DOGEUSD", name: "Dogecoin" },
];