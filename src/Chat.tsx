import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InsertEmoticon } from "@mui/icons-material";
import { Mic } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  collection,
  query,
  orderBy,
  Timestamp,
  addDoc,
} from "firebase/firestore";

import db from "./firebase";
import { useStateValue } from "./stateProvider";

interface Message {
  name: string;
  content: string;
  createdAt: Timestamp;
}

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomName(snapshot.data()?.name);
      });

      const q = query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("createdAt", "asc")
      );

      onSnapshot(q, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data() as Message))
      );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000).toString());
  }, [roomId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("you typed >>> ", input);

    if (roomId) {
      const messagesCollection = collection(db, "rooms", roomId, "messages");

      addDoc(messagesCollection, {
        name: user?.name,
        content: input,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } else {
      console.error("roomId is undefined");
    }

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}
        />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            className={`chat__message ${
              message.name === user?.name && "chat__receiver"
            }`}
            key={index}
          >
            <span className="chat__name">{message.name}</span>
            {message.content}
            <span className="chat__timestamp">
              {message.createdAt &&
                `${new Date(message.createdAt.toMillis()).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}`}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />

        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>

          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
