import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import "./Timeline.css";
import Post from "./Post";
import db from "../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import FlipMove from "react-flip-move";

function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp", "desc"));
    // getDocs(q).then((snapShot) => {
    //   setPosts(snapShot.docs.map((doc) => doc.data()));
    // });
    // リフレッシュしなくてもリアルタイムでデーターを更新するようにする
    onSnapshot(q, (querySnapShot) => {
      setPosts(querySnapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="timeline">
      {/* Header */}
      <div className="timeline__header">
        <h2>Home</h2>
      </div>
      {/* TweetBox */}
      <TweetBox />
      {/* Post */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            userName={post.userName}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Timeline;
