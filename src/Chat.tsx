import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InsertEmoticon } from "@mui/icons-material";
import { Mic } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import db from "./firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomName(snapshot.data()?.name);
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000).toString());
  }, [roomId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("you typed >>> ", input);

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
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">udin</span>
          sadad
          <span className="chat__timestamp">19:00</span>
        </p>
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
