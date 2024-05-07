import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser, error } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notification, markThisUserNotificationAsRead } =
    useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notification);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onlineUsers.some((us) => us?.userId === recipientUser?._id);

  const truncateText = (text) => {
    const truncatedText = text.substring(0, 20);
    return text.length > 20 ? `${truncatedText}...` : truncatedText;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card justify-content-between align-items-center p-2"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notification);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img
            src={
              recipientUser?.profilePicture
                ? recipientUser.profilePicture
                : avatar
            }
            alt="user"
            className="user-avatar"
            height="35px"
          />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.message && (
              <span>{truncateText(latestMessage?.message)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length === 0 ? "" : "this-user-notifications"
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications?.length
            : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
