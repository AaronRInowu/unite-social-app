import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29sbGVjdGlvbiI6InVzZXJzIiwiZW1haWwiOiIycmcyckBnbWFpbC5jb20iLCJzaWQiOiI1MThhZTk0MS1hNDg0LTQ3NDAtOGU4Yy04MWJkNTliOTVkMGEiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3NjA3NDExNjIsImV4cCI6MTc2MDc0ODM2Mn0.YEWIyyGnXbv6jNeqOmU_n-xWwDYuWKGCUHt6-NWctOI";
  if (!socket || !socket.connected) {
    socket = io("http://192.168.1.3:3002", {
      auth: {
        token,
      },
      path: "/socket.io",
      reconnectionAttempts: 5,
      transports: ["websocket"],
      autoConnect: false,
    });

    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from socket server");
    });
  }

  return socket;
};

export const emitEvent = (event: string, data: any): void => {
  if (socket) {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
