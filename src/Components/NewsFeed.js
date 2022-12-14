import {
  CalendarViewDay,
  Create,
  EventNote,
  Image,
  Photo,
  Subscriptions,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import InputOptions from "./InputOptions";
import "./NewsFeed.css";
import Post from "./Post";
import firebase from "firebase/compat/app";

function NewsFeed() {
  const [post, setPost] = useState([]);
  const [input, setInput] = useState("");
  const [picUrl, setPicUrl] = useState("");

  useEffect(() => {
    db.collection("posts")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) =>
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  function sendPostHandler(e) {
    e.preventDefault();
    if (input === "") {
      alert("Head is Required for the Post");
    } else {
      db.collection("posts").add({
        name: "Usman Farooq",
        description: "test description",
        message: input,
        photoUrl: picUrl,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
      setPicUrl("");
    }
  }

  return (
    <div className="feed">
      <div className="feed__InputContainer">
        <div className="feed__Input">
          <Create />
          <form>
            <input
              type="text"
              value={input}
              placeholder="Write your head here (Required)"
              onChange={(e) => setInput(e.target.value)}
            />
            <Photo />
            <input
              type="text"
              value={picUrl}
              placeholder="Add Image or video Link here (Optional)"
              onChange={(e) => setPicUrl(e.target.value)}
            />
            <button type="submit" onClick={sendPostHandler}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__InputOption">
          <InputOptions Icon={Image} title="Photo" color="#70B5F9" />
          <InputOptions Icon={Subscriptions} title="Video" color="#5F9B41" />
          <InputOptions Icon={EventNote} title="Audio Event" color="#5F9B41" />
          <InputOptions
            Icon={CalendarViewDay}
            title="Write Article"
            color="#5F9B41"
          />
        </div>
      </div>
      {post.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  );
}

export default NewsFeed;
