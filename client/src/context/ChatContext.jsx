import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching users", response.message);
      }
      const pChats = response.users.filter((u) => {
        let isChat = false;
        if (user?._id === u._id) return false;

        if (userChats) {
          isChat = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChat;
      });
      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/find/${user._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          setUserChatsError(response);
          return;
        }

        setUserChats(response.chats);
      }
    };

    getUserChats();
  }, [user]);

  const getMessages = async () => {
    const data = await getRequest(`${baseUrl}/messages`);

    if (data.error) {
      setError(data.message);
      return;
    }

    setMessages(data);
  };

  const sendMessage = async (message) => {
    const data = await postRequest(
      `${baseUrl}/messages`,
      JSON.stringify({ message })
    );

    if (data.error) {
      setError(data.message);
      return;
    }

    setMessages((prev) => [...prev, data]);
  };

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats/create`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log("Error creating chat", response.message);
    }

    setUserChats((prev) => [...prev, response.response]);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        getMessages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
