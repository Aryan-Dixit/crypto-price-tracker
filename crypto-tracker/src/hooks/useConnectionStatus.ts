import { useEffect, useState } from "react";

export function useConnectionStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(navigator.onLine);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return connected;
}