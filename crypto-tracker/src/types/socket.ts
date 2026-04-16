// src/types/socket.ts

export type ChannelName =
  | "v2/ticker"
  | "l2_orderbook"
  | "all_trades";

export interface SubscribeMessage {
  type: "subscribe" | "unsubscribe";
  payload: {
    channels: {
      name: ChannelName;
      symbols?: string[];
    }[];
  };
}

// ---------- TICKER ----------
export interface TickerData {
  symbol: string;
  last_price: number;
  mark_price: number;
  volume_24h: number;
  high_24h: number;
  low_24h: number;
  funding_rate: number;
  change_24h: number;
}

// ---------- ORDERBOOK ----------
export interface OrderBookLevel {
  price: number;
  size: number;
}

export interface OrderBookData {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
}

// ---------- TRADES ----------
export interface Trade {
  price: number;
  size: number;
  side: "buy" | "sell";
  timestamp: number;
}

export interface TradesData {
  symbol: string;
  trades: Trade[];
}

// ---------- GENERIC SOCKET MESSAGE ----------
export interface SocketMessage<T = any> {
  channel: ChannelName;
  symbol: string;
  data: T;
}