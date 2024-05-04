import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendMessageError, setSendMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("Notification", notification);

  // Connect to the socket server
  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  // Add the user to the online users list
  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  // send the new message to the server
  useEffect(() => {
    if (!socket) return;
    const recipientId = currentChat?.members.find((id) => id !== user._id);
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // receive messages and notification from the server
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (message) => {
      if (currentChat?._id === message.chatId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("getNotification", (notification) => {
      const isChatOpen = currentChat?.members.some(
        (id) => id === notification.senderId
      );
      isChatOpen &&
        setNotification((prev) => [...prev, { ...notification, isRead: true }]);

      !isChatOpen && setNotification((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [currentChat, socket]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching users", response.message);
      }

      setAllUsers(response.users);
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

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        setIsMessagesLoading(true);
        setMessagesError(null);
        const response = await getRequest(
          `${baseUrl}/messages/${currentChat._id}`
        );

        setIsMessagesLoading(false);

        if (response.error) {
          setMessagesError(response.message);
          return;
        }

        setMessages(response.messages);
      }
    };
    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const sendMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");

      const response = await postRequest(
        `${baseUrl}/messages/create`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._id,
          message: textMessage,
        })
      );

      if (response.error) {
        setSendMessageError(response.message);
        return;
      }

      setNewMessage(response.response);
      setTextMessage("");
      setMessages((prev) => [...prev, response.response]);
    },
    []
  );

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

  const markAllNotificationAsRead = useCallback((notification) => {
    const mNotifications = notification.map((n) => {
      return { ...n, isRead: true };
    });

    setNotification(mNotifications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notification) => {
      // find chat to open
      const desiredChat = userChats.find((chat) => {
        const chatMembers = [user._id, n.senderId];
        const isDesiredChat = chat.members.every((m) =>
          chatMembers.includes(m)
        );

        return isDesiredChat;
      });

      updateCurrentChat(desiredChat);

      // mark notification as read
      const mNotifications = notification.map((not) => {
        if (not.senderId === n.senderId) {
          return { ...n, isRead: true };
        }

        return not;
      });

      setNotification(mNotifications);
    },
    []
  );

  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotifications, notification) => {
      const mNotifications = notification.map((n) => {
        let notif;

        thisUserNotifications.forEach((tun) => {
          if (tun.senderId === n.senderId) {
            notif = { ...n, isRead: true };
          } else {
            notif = n;
          }
        });

        return notif;
      });

      setNotification(mNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        updateCurrentChat,
        createChat,
        currentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendMessage,
        sendMessageError,
        onlineUsers,
        notification,
        allUsers,
        markAllNotificationAsRead,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
