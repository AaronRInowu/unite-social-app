import { ChatMessage } from "@/global/interfaces/chats.interface";
import { User } from "@/global/interfaces/users.interface";
import { Text, View } from "react-native";

export const ChatBubble = ({
  me,
  chatMessage,
}: {
  me: User;
  chatMessage?: ChatMessage | number;
}) => {
  const validMess =
    chatMessage && typeof chatMessage !== "number" ? chatMessage : undefined;
  const isMe =
    (typeof validMess?.sender === "number"
      ? validMess.sender
      : validMess?.sender.id) === me.id;
  const validOther = isMe ? me : validMess?.sender;
  const user =
    validOther && typeof validOther !== "number" ? validOther : undefined;

  return (
    <View className="gap-2">
      <View className={`gap-2 ${!isMe ? "flex-row" : "flex-row-reverse"}`}>
        <View className="bg-[#FFFFFF4D] flex-1 rounded-xl p-3">
          <Text className={`${validMess ? "text-main" : "text-neutral-400"}`}>
            {validMess?.content ?? "Hubo un error"}
          </Text>
        </View>
        <View className="bg-neutral-500 w-[46px] aspect-square rounded-full self-end"></View>
      </View>
      <View className={`flex-row gap-2 ${!isMe ? "justify-end" : ""}`}>
        <Text
          className={`font-bold text-neutral-500 ${!user ? "italics" : ""}`}
        >
          {!user ? "Error" : `${user.firstName ?? ""} ${user.lastName ?? ""}`}
        </Text>
        <Text className="text-neutral-500">
          {new Date().toLocaleTimeString("en", {
            hour12: true,
            hour: "numeric",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};
