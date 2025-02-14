export const connectWebSocket = (onMessage: (data: any) => void) => {
    const socket = new WebSocket("ws://localhost:8000/ws/trading-signals");
  
    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => onMessage(JSON.parse(event.data));
    socket.onclose = () => console.log("WebSocket disconnected");
  
    return socket;
  };