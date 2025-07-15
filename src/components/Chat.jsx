import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user?.data);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    // message received
    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    // send message
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto h-[70vh] bg-slate-950 m-2 rounded flex flex-col">
      <h1 className="font-bold text-xl border-b-2 border-b-gray-400 p-2">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages body */}
        {messages.map((msg, id) => (
          <div className="chat chat-start" key={id}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg?.firstName}
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">{msg?.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-2">
        <input
          type="text"
          value={newMessage}
          className="p-2 flex-1 rounded"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
