import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { SidebarProps } from "./sidebar.type";
import db from "./firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";

interface Message {
  name: string;
  content: string;
  createdAt: Timestamp;
}

const SidebarChat = (props: SidebarProps) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (props.id) {
      const q = query(
        collection(db, "rooms", props.id, "messages"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data() as Message));
      });
    }
  }, [props.id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000).toString());
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some clever database stuff
      const roomCollection = collection(db, "rooms");

      addDoc(roomCollection, {
        name: roomName,
      });
    }
  };

  return !props.addNewChat ? (
    <Link to={`/rooms/${props.id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`}
        />
        <div className="sidebarChat__info">
          <h2>{props.name}</h2>
          <p>{messages[0]?.content}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
