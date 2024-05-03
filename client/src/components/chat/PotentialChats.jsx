import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import avatar from "../../assets/avatar.svg";

const potentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user?._id, u?._id)}
              >
                <img
                  src={u?.profilePicture ? u.profilePicture : avatar}
                  alt="user"
                  className="user-avatar me-2"
                  height="20px"
                />
                {u.name}
                <span
                  className={
                    onlineUsers.some((us) => us?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default potentialChats;
