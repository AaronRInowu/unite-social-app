import { Chat, ChatMessage } from "@/global/interfaces/chats.interface";
import { User } from "@/global/interfaces/users.interface";
import { axiosInstance } from "@/services/restapi/axiosConfig";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

//"me" se saca del auth token
export const ChatPreview = ({
  me,
  chats,
}: {
  me: User;
  chats?: Partial<Chat>;
}) => {
  //si chat tiene un id es porque ya existe si no nomas se quiere usar los "members"
  const unreadTexts: number | undefined = undefined;
  const messages = chats?.messages?.docs ?? [];
  const lastMessage = messages[messages.length - 1];
  const lastMessageToday =
    lastMessage && typeof lastMessage !== "number"
      ? new Date(lastMessage.createdAt).getTime() <= new Date().getTime()
      : false;
  const otherUser = chats?.members
    ? chats.members.find((f) =>
        typeof f !== "number" ? f.id !== me.id : undefined
      )
    : undefined;
  const user = typeof otherUser !== "number" ? otherUser : undefined;

  const startChat = async () => {
    try {
      if (!chats?.id) {
        if (user) {
          await axiosInstance.post(`/chats`, {
            members: [me.id, typeof user !== "number" ? user.id : user],
          });
          router.push("/");
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={startChat}
      className="flex-row items-center gap-3 border border-white"
    >
      <View className="w-[60px] aspect-square rounded-full bg-neutral-500"></View>
      <View className="flex-1 gap-2">
        <Text className="text-main">
          {user?.firstName ?? ""} {user?.lastName ?? ""}
        </Text>
        {!!lastMessage && (
          <Text className="text-neutral-500">
            {typeof lastMessage === "number"
              ? "Couldn't retrieve data"
              : lastMessage.content}
          </Text>
        )}
      </View>
      <View className="items-end gap-2">
        <Text className="text-neutral-500">
          {lastMessage
            ? lastMessageToday
              ? new Date(
                  (lastMessage as ChatMessage).createdAt
                ).toLocaleTimeString("en", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
              : new Date().toLocaleDateString("en", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
            : "Start a chat"}
        </Text>
        {unreadTexts && (
          <Text className="text-main rounded-full bg-rose-600 aspect-square text-center p-1">
            {unreadTexts}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
