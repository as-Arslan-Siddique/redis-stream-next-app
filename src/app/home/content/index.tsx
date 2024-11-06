"use client";
import { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket("ws://localhost:8080/ws");

    // On connection open
    socket.onopen = () => {
      setConnectionStatus("Connected");
      console.log("Connected to WebSocket server");
    };

    // On receiving a message from the WebSocket
    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("New message received:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Handle connection close
    socket.onclose = () => {
      setConnectionStatus("Disconnected");
      console.log("WebSocket connection closed");
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Connection Status: {connectionStatus}</h2>
      <h3>Messages:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
