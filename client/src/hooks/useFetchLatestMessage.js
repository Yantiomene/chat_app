import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchLatestMessage = (chat) => {
  const { newMesssage, notification } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat._id}`);

      if (response.error) {
        return console.log("Error fetching messages", response.message);
      }

      const lastMessage = response.messages[response.messages.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessage();
  }, [newMesssage, notification]);

  return { latestMessage };
};
