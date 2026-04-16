type Handler = (data: any) => void;

class SocketManager {
  private socket: WebSocket | null = null;
  private handlers: Map<string, Set<Handler>> = new Map();
  private subscriptions: Set<string> = new Set();

  private isConnecting = false;
  private reconnectTimeout: number | null = null;

  private status: "connecting" | "connected" | "disconnected" = "disconnected";
  private statusListeners = new Set<(s: string) => void>();

  private WS_URL = "ws://localhost:8080";

  // CONNECT
  connect() {
    if (this.socket || this.isConnecting) return;

    this.isConnecting = true;
    this.status = "connecting";
    this.notifyStatus();

    this.socket = new WebSocket(this.WS_URL);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.isConnecting = false;
      this.status = "connected";
      
      this.notifyStatus();

      // re-subscribe everything
      this.resubscribeAll();
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      const key = `${msg.type}:${msg.symbol}`;
      const handlers = this.handlers.get(key);

      if (handlers) {
        handlers.forEach((h) => h(msg));
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");

      this.socket = null;
      this.isConnecting = false;

      this.status = "disconnected";
      this.notifyStatus();

      this.scheduleReconnect();
    };

    this.socket.onerror = () => {
      console.log("WebSocket error");
      this.socket?.close();
    };
  }

  // RECONNECT
  private scheduleReconnect() {
    if (this.reconnectTimeout) return;

    this.reconnectTimeout = window.setTimeout(() => {
      console.log("Reconnecting...");
      this.reconnectTimeout = null;
      this.connect();
    }, 1000); // retry after 1s
  }

  // SUBSCRIBE
  subscribe(channel: string, symbol: string, handler: Handler) {
    const key = `${channel}:${symbol}`;

    if (!this.handlers.has(key)) {
      this.handlers.set(key, new Set());
    }

    this.handlers.get(key)!.add(handler);

    this.subscriptions.add(key);

    this.connect();

    this.send({
      type: "subscribe",
      payload: {
        channels: [{ name: channel, symbols: [symbol] }],
      },
    });
  }

  // UNSUBSCRIBE
  unsubscribe(channel: string, symbol: string, handler: Handler) {
    const key = `${channel}:${symbol}`;

    const set = this.handlers.get(key);
    if (set) {
      set.delete(handler);

      if (set.size === 0) {
        this.handlers.delete(key);
        this.subscriptions.delete(key);

        this.send({
          type: "unsubscribe",
          payload: {
            channels: [{ name: channel, symbols: [symbol] }],
          },
        });
      }
    }
  }

  // RESUBSCRIBE AFTER RECONNECT
  private resubscribeAll() {
    this.subscriptions.forEach((key) => {
      const [channel, symbol] = key.split(":");

      this.send({
        type: "subscribe",
        payload: {
          channels: [{ name: channel, symbols: [symbol] }],
        },
      });
    });
  }

  // SAFE SEND
  private send(data: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;

    this.socket.send(JSON.stringify(data));
  }

    private notifyStatus() {
   this.statusListeners.forEach((cb) => cb(this.status));
  }

  onStatusChange(cb: (status: string) => void) {
   this.statusListeners.add(cb);
   cb(this.status);

   return () => {
     this.statusListeners.delete(cb);
   };
  }
}

export const socketManager = new SocketManager();