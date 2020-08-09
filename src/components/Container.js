import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";

const ENDPOINT = "http://192.168.0.105:8000";

export default function Container(props) {
  const socket = socketIOClient(ENDPOINT);
  console.log("props :>> ", props);

  // Array of messages
  const [messages, setMessages] = useState([]);
  //  Current message
  const [message, setMessage] = useState("");
  // Your ID
  const [yourID, setYourID] = useState(null);
  // Your name
  const [name, setName] = useState(null);

  useEffect(() => {
    let tempName = prompt("What is your name");
    setName(tempName);
    socket.emit("new-user-joined", tempName);

    socket.on("your id", (id) => {
      setYourID(id);
    });

    socket.on("recieve", (message) => {
      console.log("here");
      console.log("message :>> ", message);
      receivedMessage(message);
    });

    socket.on("user-joined", (name) => {
      console.log("name :>> ", name);
      newUserJoined(name);
    });
  }, []);

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
      name: name,
    };
    setMessage("");
    socket.emit("send", messageObject);
  }

  function newUserJoined(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  console.log("messages :>> ", messages);

  return (
    <React.Fragment>
      <div className="main-container">
        <div
          className="container"
          style={{ width: isMobile ? "90vw" : "70vw" }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "10px 0px",
              fontSize: "25px",
            }}
          >
            Chat App
          </div>
          {props.location.state ? (
            <div
              style={{
                textAlign: "center",
                padding: "5px 0px",
                fontSize: "15px",
                color: "#4a5568",
              }}
            >
              Group Name : {props.location.state.groupName}
            </div>
          ) : null}
          {messages.map((item, index) => {
            if (!item.message) {
              return (
                <div className="centerBlockMessage">{item} joined the chat</div>
              );
            }
            if (item.message.id === yourID) {
              return (
                <div className="rightBlockMessage">
                  <span style={{ textTransform: "capitalize" }}>
                    {item.message.name}
                  </span>{" "}
                  : {item.message.body}
                </div>
              );
            }
            return (
              <div className="leftBlockMessage">
                <span style={{ textTransform: "capitalize" }}>
                  {item.message.name}
                </span>{" "}
                : {item.message.body}
              </div>
            );
          })}
        </div>
        <form onSubmit={sendMessage}>
          <input
            value={message}
            onChange={handleChange}
            placeholder="Say something..."
            className="messageContainer"
            style={{
              width: isMobile ? "75vw" : "65vw",
              paddingLeft: "5px",
            }}
          />
          <Button
            className="sendButton"
            variant="contained"
            style={{
              width: isMobile ? "15vw" : "5vw",
              height: isMobile ? "100%" : "fit-content",
              backgroundColor: "black",
              color: "white",
              marginLeft: "2px",
            }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
}
