import { useEffect, useState } from "react";
import { socketManager } from "../services/socketManager";

export function useSocketStatus() {
  const [status, setStatus] = useState<string>("connecting");

  useEffect(() => {
    const unsubscribe = socketManager.onStatusChange(setStatus);
    return unsubscribe;
  }, []);

  return status;
}