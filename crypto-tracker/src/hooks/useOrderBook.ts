import { useEffect, useState, useRef } from "react";
import { socketManager } from "../services/socketManager";

interface Level {
  price: number;
  size: number;
}

export function useOrderBook(symbol: string) {
  const [orderbook, setOrderbook] = useState<{
    bids: Level[];
    asks: Level[];
  } | null>(null);

  const bufferRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = (msg: any) => {
      const bids: Level[] = (msg.bids || [])
        .slice(0, 10)
        .map((b: any) => ({
          price: Number(b[0]),
          size: Number(b[1]),
        }));

      const asks: Level[] = (msg.asks || [])
        .slice(0, 10)
        .map((a: any) => ({
          price: Number(a[0]),
          size: Number(a[1]),
        }));

      bufferRef.current = { bids, asks };

      // throttle updates
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setOrderbook(bufferRef.current);
          rafRef.current = null;
        });
      }
    };

    socketManager.subscribe("l2_orderbook", symbol, handler);

    return () => {
      socketManager.unsubscribe("l2_orderbook", symbol, handler);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [symbol]);

  return orderbook;
}