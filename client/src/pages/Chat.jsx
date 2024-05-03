import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";

const Chat = () => {
  const {
    userChats,
    isUserChatsLoading,
    userChatsError,
    getMessages,
    sendMessage,
  } = useContext(ChatContext);

  const { user } = useContext(AuthContext);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChatsError && <p>{userChatsError.message}</p>}
            {userChats?.map((chat, index) => (
              <Stack key={index} gap={3}>
                <UserChat chat={chat} user={user} />
              </Stack>
            ))}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
