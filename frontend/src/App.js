import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState("");
  const [tweet, setTweet] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:5000`);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  const newMessage = () => {
    if (name !== "" && tweet !== "") {
      socket.emit("new-message", { name, tweet });
    }
  };

  socket?.on("new-posts", (data) => {
    setPosts(data);
  });

  socket?.on("posts", (data) => {
    setPosts(data);
  });

  return (
    <div className="root">
      <div className="main">
        <div className="form">
          <p>Post</p>
          <input
            placeholder="Your name"
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Your tweet"
            className="tweet-input"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          ></textarea>
          <button onClick={newMessage}>Post!</button>
        </div>
      </div>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <p>{post.name}</p>
          <p>{post.tweet}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
