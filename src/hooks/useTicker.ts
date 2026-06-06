import { useEffect, useRef, useState } from "react";
import { socketManager } from "../services/socketManager";

export function useTicker(symbol: string) {
  const [data, setData] = useState<any>(null);

  const bufferRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = (msg: any) => {
      bufferRef.current = {
        last_price: Number(msg.mark_price),
        change_24h: Number(msg.ltp_change_24h),
      };

      // throttle using requestAnimationFrame
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setData(bufferRef.current);
          rafRef.current = null;
        });
      }
    };

    socketManager.subscribe("v2/ticker", symbol, handler);

    return () => {
      socketManager.unsubscribe("v2/ticker", symbol, handler);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [symbol]);

  return data;
}