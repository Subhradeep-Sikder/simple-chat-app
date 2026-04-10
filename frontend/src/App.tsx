import { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  isMe: boolean;
}

export default function App() {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);
  
  const socketRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function joinRoom() {
    if (!roomId || !name) return alert("Please enter name and room code");
    
    const ws = new WebSocket("ws://localhost:8080");
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: { roomId }
      }));
      setJoined(true);
    };

    ws.onmessage = (event) => {
     
      const data = JSON.parse(event.data);

      if (data.type === "update") {
        
        setUserCount(data.payload.count);
      } 
      
      if (data.type === "chat") {
        // Add message from other user
        setMessages((prev) => [...prev, { text: data.payload.message, isMe: false }]);
      }
    };

    socketRef.current = ws;
  }

  function sendMessage() {
  
    if (!socketRef.current || !message.trim() || userCount < 2) return;
    
    socketRef.current.send(JSON.stringify({
      type: "chat",
      payload: { message }
    }));
    
    setMessages((prev) => [...prev, { text: message, isMe: true }]);
    setMessage("");
  }

  if (!joined) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white font-mono">
        <div className="w-[450px] rounded-xl border border-zinc-800 bg-[#0a0a0a] p-8 shadow-2xl">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <h1 className="text-2xl font-bold tracking-tight">Real Time Chat</h1>
          </div>
          <p className="mb-8 text-sm text-zinc-500">temporary room that expires after all users exit</p>
          
          <button 
            onClick={() => setRoomId(Math.random().toString(36).substring(7).toUpperCase())}
            className="mb-6 w-full rounded-lg bg-zinc-200 py-3 font-semibold text-black hover:bg-white transition-colors"
          >
            Create New Room
          </button>

          <input 
            type="text" 
            placeholder="Enter your name" 
            className="mb-4 w-full rounded-lg border border-zinc-800 bg-transparent p-3 text-zinc-300 outline-none focus:border-zinc-500"
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter Room Code" 
              value={roomId}
              className="flex-1 rounded-lg border border-zinc-800 bg-transparent p-3 text-zinc-300 outline-none focus:border-zinc-500"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button 
              onClick={joinRoom}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white font-mono p-4">
      <div className="flex h-[600px] w-[450px] flex-col rounded-xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl overflow-hidden">
        {/*Header*/}
        <div className="p-6 border-b border-zinc-900 bg-[#0d0d0d]">
          <div className="flex items-center gap-2 mb-1">
            <span>💬</span>
            <h1 className="font-bold">Real Time Chat</h1>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">temporary room that expires after both users exit</p>
          
          <div className="mt-4 flex justify-between rounded bg-zinc-900/50 p-2 text-xs text-zinc-400 border border-zinc-800">
            <span>Room Code: <span className="text-zinc-200 font-bold">{roomId}</span></span>
            {/*Dynamic User Count Color */}
            <span className={userCount >= 2 ? "text-green-400" : "text-zinc-500"}>
              Users: {userCount}/2
            </span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                msg.isMe 
                  ? "self-end bg-white text-black rounded-tr-none" 
                  : "self-start bg-zinc-800 text-zinc-200 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-[#0d0d0d] border-t border-zinc-900 flex gap-2">
          <input 
            type="text" 
            value={message}
            //Disable input if less than 2 users
            disabled={userCount < 2}
            placeholder={userCount < 2 ? "Waiting for someone to join..." : "Type a message..."}
            className={`flex-1 bg-transparent border border-zinc-800 rounded-md px-4 py-2 text-sm outline-none transition-all ${
              userCount < 2 ? "opacity-40 cursor-not-allowed" : "focus:border-zinc-500"
            }`}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            onClick={sendMessage}
            //Disable button if less than 2 users
            disabled={userCount < 2}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all active:scale-95 ${
              userCount < 2 
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                : "bg-zinc-200 hover:bg-white text-black"
            }`}
          >
            {userCount < 2 ? "Locked" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}