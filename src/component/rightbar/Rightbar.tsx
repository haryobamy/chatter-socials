import "./rightbar.css";

import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { Users } from "../../dummyData";
import { Remove, Add } from "@mui/icons-material";
import { httpRequest } from "@/constant/https/httpsRequest";
import { BASE_URL } from "@/constant/https/config";
import { useAppSelector } from "@/constant/redux/hooks";

type IRightbar = {
  user?: any;
};

export default function Rightbar({ user }: IRightbar) {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;

  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useAppSelector((state) => state?.auth);
  const { dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await httpRequest({
          BASE_URL: BASE_URL,
          url: `users/friends/${currentUser?._id}`,
          method: "GET",
        });
        // const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);

  const handleClick = async () => {
    try {
      if (followed) {
        await httpRequest({
          BASE_URL: BASE_URL,
          url: `/users/${currentUser._id}/unfollow`,
          method: "PUT",
          body: {
            userId: currentUser._id,
          },
        });
        // await axios.put(`/users/${user._id}/unfollow`, {
        //   userId: currentUser._id,
        // });
        dispatch({ type: "UNFOLLOW", payload: currentUser._id });
      } else {
        await httpRequest({
          BASE_URL: BASE_URL,
          url: `/users/${currentUser._id}/follow`,
          method: "PUT",
          body: {
            userId: currentUser._id,
          },
        });
        // await axios.put(`/users/${user._id}/follow`, {
        //   userId: currentUser._id,
        // });
        dispatch({ type: "FOLLOW", payload: currentUser._id });
      }
      setFollowed(!followed);
    } catch (err) {
      /* empty */
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend: any) => (
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
