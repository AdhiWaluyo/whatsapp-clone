import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { SidebarProps } from "./sidebar.type";

const SidebarChat = (props: SidebarProps) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000).toString());
  }, []);

	const createChat = () => {
		const roomName = prompt("Please enter name for chat");

		if (roomName) {
			// do some clever database stuff
			
		}
	};

  return !props.addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new chat</h2>
    </div>
  );
};

export default SidebarChat;
