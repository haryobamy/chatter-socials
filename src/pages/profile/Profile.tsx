import "./profile.css";

import { useEffect, useState } from "react";
// import axios from "axios";
import { useParams } from "react-router";
import { BASE_URL } from "@/constant/https/config";
import { httpRequest } from "@/constant/https/httpsRequest";
import Topbar from "@/component/topbar/Topbar";
import Sidebar from "@/component/sidebar/Sidebar";
import Feed from "@/component/feed/Feed";
import Rightbar from "@/component/rightbar/Rightbar";

export default function Profile() {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState<any>({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await httpRequest({
        BASE_URL: BASE_URL,
        url: `users?username=${username}`,
        method: "GET",
      });
      // await axios.get(`/users?username=${username}`);
      setUser(res);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
