import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

import { BASE_URL } from "@/constant/https/config";
import { httpRequest } from "@/constant/https/httpsRequest";
import { useAppSelector } from "@/constant/redux/hooks";

type IFeed = {
  username?: any;
};

export default function Feed({ username }: IFeed) {
  const [posts, setPosts] = useState([]);
  // const { user } = useContext(AuthContext);
  const { user } = useAppSelector((state) => state?.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await httpRequest({
            BASE_URL: BASE_URL,
            url: `posts/profile/${username}`,
            method: "GET",
          })
        : // await axios.get("/posts/profile/" + username)
          await httpRequest({
            BASE_URL: BASE_URL,
            url: `posts/timeline/${user._id}`,
            method: "GET",
          });
      //  await axios.get("posts/timeline/" + user._id);

      setPosts(res);
      // setPosts(
      //   res.data.sort((p1: any, p2: any) => {
      //     return new Date(p2.createdAt) - new Date(p1.createdAt);
      //   })
      // );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts && posts?.map((p: any) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
}
