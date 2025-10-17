import { ChatBubble } from "@/components/Containers/ChatComponents/ChatBubble";
import GradientButton from "@/components/Inputs/GradientButton";
import { returnOtherUser } from "@/global/functions/chats.functions";
import { Chat, ChatMessage } from "@/global/interfaces/chats.interface";
import { User } from "@/global/interfaces/users.interface";
import { axiosInstance } from "@/services/restapi/axiosConfig";
import { retrieveGeneral } from "@/services/restapi/general.axios";
import { getSocket } from "@/services/socketFunctions";
import { ArrowLeft2, Send2 } from "iconsax-react-nativejs";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type IonlineUsers = {
  userId: number;
  socketId: string;
};

export const SingleChat = ({ me }: { me: User }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<(number | ChatMessage)[]>([]);
  const [tempMsg, setTempMsg] = useState("");

  const selectedChatUser = returnOtherUser(me.id, selectedChat?.members);

  useEffect(() => {
    if (selectedChat) {
      const socket = getSocket();
      if (!!socket) {
        console.log(socket.connected);
        socket.emit("join-chat", { chatId: selectedChat.id });
        socket.on("new-message", (data: ChatMessage) => {
          const { sender, ...rest } = data;
          const senderWuser =
            (typeof sender === "number" ? sender : sender.id) ===
            selectedChatUser?.id
              ? selectedChatUser
              : sender;
          setMessages((prev) => [
            {
              sender: senderWuser,
              ...rest,
            },
            ...prev,
          ]);
        });
      }
      setMessages(
        (selectedChat?.messages?.docs ?? []).map((m) => {
          const isValid = typeof m !== "number";
          const senderIsMe = isValid
            ? (typeof m.sender === "number"
                ? m.sender
                : (m.sender?.id ?? 0)) === me.id
            : false;
          return !isValid
            ? m
            : {
                chat: m.chat,
                content: m.content,
                createdAt: m.createdAt,
                id: m.id,
                updatedAt: m.updatedAt,
                sender: senderIsMe
                  ? me.id
                  : (selectedChat?.members.find(
                      (f) =>
                        (typeof f === "number" ? f : f.id) ===
                        (typeof m.sender === "number" ? m.sender : m.sender.id)
                    ) ?? m.sender),
              };
        })
      );
    }
    return () => {
      if (selectedChat) {
        const socket = getSocket();
        if (!!socket) {
          socket.emit("close-chat", { chatId: selectedChat.id });
        }
      }
    };
  }, [selectedChat]);

  const handleMessages = async () => {
    try {
      const temp = {
        sender: me.id,
        chat: selectedChat,
        content: tempMsg,
      };
      await axiosInstance.post("/chat-messages", temp);
      setTempMsg("");
    } catch (error) {
      console.error(error);
    }
  };

  const getChats = async () => {
    try {
      const res = await retrieveGeneral<Chat>(
        `/chats?where[members][contains]=${me.id}`
      );
      setChats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <View className="flex-1 p-6">
      {!selectedChat ? (
        <ScrollView>
          {chats.length > 0 ? (
            chats.map((c) => {
              const user = returnOtherUser(me.id, c.members);
              return (
                <TouchableOpacity key={c.id} onPress={() => setSelectedChat(c)}>
                  <GradientButton>
                    <Text>{user?.firstName ?? "?"}</Text>
                  </GradientButton>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text className="text-main">no hay</Text>
          )}
        </ScrollView>
      ) : (
        <>
          <View className="flex-row gap-3 items-center">
            <ArrowLeft2 color="#fff" size={24} />
            <Text className="text-main text-unite-title">
              {selectedChatUser?.firstName ?? ""}{" "}
              {selectedChatUser?.lastName ?? ""}
            </Text>
          </View>
          <ScrollView contentContainerClassName="gap-4 py-3 pb-24 flex-col-reverse">
            {messages.length > 0 ? (
              messages.map((m, i) => {
                //sender should always be number
                return <ChatBubble chatMessage={m} me={me} key={i} />;
              })
            ) : (
              <Text className="text-main">
                Start your connection as simple as Hello!
              </Text>
            )}
          </ScrollView>
          <View
            className={`bg-input-bg-solid rounded-s-xl h-[120px] absolute left-0 right-0 bottom-0`}
          >
            <View className="flex-row px-6 py-3">
              <TextInput
                className="flex-1 text-main"
                placeholder="Type a message..."
                placeholderTextColor={"#cacaca"}
                value={tempMsg}
                onChangeText={(e) => setTempMsg(e)}
              />
              <TouchableOpacity
                disabled={tempMsg.trim() === ""}
                activeOpacity={1}
                onPress={handleMessages}
                className={`rounded-full overflow-hidden items-center disabled:opacity-40`}
              >
                <GradientButton>
                  <Send2 variant="Bold" color="#FFF" />
                </GradientButton>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
