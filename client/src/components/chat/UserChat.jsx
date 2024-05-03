import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";

const UserChat = ({ chat, user }) => {
  const { recipientUser, error } = useFetchRecipientUser(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card justify-content-between align-items-center p-2"
      role="button"
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
          <div className="text">Last message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">03/05/2024</div>
        <div className="time">12:00 PM</div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

export default UserChat;
