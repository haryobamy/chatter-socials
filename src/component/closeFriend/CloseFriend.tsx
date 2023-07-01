import "./closeFriend.css";

export default function CloseFriend({ user }: { user: any }) {
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
