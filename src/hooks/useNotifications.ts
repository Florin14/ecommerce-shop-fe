import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";

interface WsNotification {
  type: string;
  data: {
    message: string;
    order_id?: number;
    [key: string]: unknown;
  };
}

export function useNotifications() {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<WsNotification[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const toast = useToast();

  const connect = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/v1/notifications/ws?token=${token}`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (event) => {
        const notification: WsNotification = JSON.parse(event.data);
        setNotifications((prev) => [notification, ...prev]);
        toast({
          title: notification.data.message,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      };

      ws.onclose = () => {
        setConnected(false);
        // Auto-reconnect after 5s
        setTimeout(connect, 5000);
      };

      ws.onerror = () => ws.close();
    } catch {
      // WebSocket not available
    }
  }, [toast]);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    setConnected(false);
  }, []);

  const markAsRead = useCallback((notificationId: number) => {
    wsRef.current?.send(JSON.stringify({ action: "mark_read", notification_id: notificationId }));
  }, []);

  useEffect(() => {
    connect();
    return disconnect;
  }, [connect, disconnect]);

  return { connected, notifications, markAsRead };
}
