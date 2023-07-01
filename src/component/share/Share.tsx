import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useRef, useState } from "react";

import { httpRequest } from "@/constant/https/httpsRequest";
import { BASE_URL } from "@/constant/https/config";
import { useAppSelector } from "@/constant/redux/hooks";
// import axios from "axios";

export default function Share() {
  const { user } = useAppSelector((state) => state?.auth);
  const PF = import.meta.env.VITE_APP_PUBLIC_FOLDER;
  const desc = useRef<any>();
  const [file, setFile] = useState<FileList | null | any>(null);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const newPost: any = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file?.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await httpRequest({
          BASE_URL: BASE_URL,
          url: "upload",
          method: "POST",
          body: data,
        });
        // await axios.post("/upload", data);
      } catch (err) {
        /* empty */
      }
    }
    try {
      await httpRequest({
        BASE_URL: BASE_URL,
        url: "posts",
        method: "POST",
        body: newPost,
      });
      // await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      /* empty */
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  setFile(e?.target?.files[0])
                }
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
