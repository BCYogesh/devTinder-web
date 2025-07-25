import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { extractISTTime } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user?.data);
  const connections = useSelector((store) => store.connections);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUserDetails, setTargetUserDetails] = useState(null);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const userId = user?._id;

  const fetchMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.data?.messages?.map((msg) => {
      const time = extractISTTime(msg?.createdAt);

      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        createdAt: time,
        text,
      };
    });
    setMessages(chatMessages);
  };

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

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

  useEffect(() => {
    fetchMessages();
  }, [newMessage]);

  useEffect(() => {
    getConnections();
  }, []);

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

    setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 300);
  };

  useEffect(() => {
    if (connections) {
      let chatterDetails = connections.filter((con) => con._id == targetUserId);

      if (chatterDetails) {
        setTargetUserDetails(chatterDetails[0]);
      }
    }
  }, [connections]);

  return (
    <div className="mx-4">
      <div className="md:w-3/4 w-full  h-[70vh] mx-auto bg-slate-950 m-2 rounded flex flex-col">
        <h2 className="font-bold text-xl border-b-2 border-b-gray-400 p-2 text-white">
          {targetUserDetails &&
            targetUserDetails.firstName + " " + targetUserDetails.lastName}
        </h2>

        <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
          {/* Messages body */}
          {messages &&
            messages.map((msg, id) => (
              <div
                className={
                  "chat " +
                  (user?.firstName == msg?.firstName
                    ? "chat-end"
                    : "chat-start")
                }
                key={id}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        user?.firstName == msg?.firstName
                          ? user?.photoURL
                          : targetUserDetails?.photoURL
                      }
                    />
                  </div>
                </div>
                <div className="chat-header text-white">
                  {msg?.firstName + " " + msg?.lastName}
                  <time className="text-xs opacity-50">{msg?.createdAt}</time>
                </div>
                <div className="chat-bubble text-white bg-black">
                  {msg?.text}
                </div>
                <div className="chat-footer opacity-50 text-gray-100">
                  Delivered
                </div>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
