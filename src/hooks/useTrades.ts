import { useEffect, useState, useRef } from "react";
import { socketManager } from "../services/socketManager";

export function useTrades(symbol: string) {
  const [trades, setTrades] = useState<any[]>([]);

  const bufferRef = useRef<any[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = (msg: any) => {
      const trade = {
        price: Number(msg.price),
        size: Number(msg.size),

        side:
          msg.side ||
          (msg.isBuyerMaker === true ? "sell" : "buy") ||
          "buy",
      };

      bufferRef.current = [trade, ...bufferRef.current].slice(0, 13);

      // throttle updates
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setTrades([...bufferRef.current]);
          rafRef.current = null;
        });
      }
    };

    socketManager.subscribe("all_trades", symbol, handler);

    return () => {
      socketManager.unsubscribe("all_trades", symbol, handler);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [symbol]);

  return trades;
}