import React, { useEffect, useRef } from "react";
import { auth } from "../firebase";

type UserProps = {
  user: any;
  messages: any[];
  setNewMessage: any;
  sendMessage: any;
  newMessage: string;
};
function ChatRoom({
  user,
  messages,
  sendMessage,
  newMessage,
  setNewMessage,
}: UserProps) {
  
  const focusRef = useRef<any>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage();
    setNewMessage("");
  };

  useEffect(() => {
    focusRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  console.log(messages);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <span className="navbar-title">Chat Room</span>
          <div className="navbar-user">
            <span className="navbar-username">{user.displayName}</span>
            <button onClick={() => auth.signOut()} className="navbar-signout">
              Sign Out
            </button>
          </div>
        </nav>
        <main className="App-main">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                className={
                  message.data.uid === user.uid ? "messageDiv1" : "messageDiv2"
                }
                ref={focusRef}
                key={index}
              >
                <img src={message.data.photoURL} alt="" />
                <p>{message.data.text}</p>
              </div>
            ))}
            <div></div>
          </div>
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              name="message"
              value={newMessage}
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </main>
      </header>
    </div>
  );
}

export default ChatRoom;
