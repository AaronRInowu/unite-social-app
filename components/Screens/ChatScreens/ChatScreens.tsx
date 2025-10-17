import { ChatPreview } from "@/components/Containers/ChatComponents/ChatPreview";
import { returnOtherUser } from "@/global/functions/chats.functions";
import { Chat, MyChats } from "@/global/interfaces/chats.interface";
import { Connection } from "@/global/interfaces/connections.interface";
import { User } from "@/global/interfaces/users.interface";
import { retrieveSingleGeneral } from "@/services/restapi/general.axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fragment, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export const ChatScreens = ({ me }: { me: User }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const getValidChats = async () => {
    try {
      const { data } = await retrieveSingleGeneral<MyChats>(
        `/chats/me/${me.id}`
      );
      setChats(data.chats);
      setConnections(data.connections);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getValidChats();
  }, []);

  return (
    <View className="gap-6 flex-1 pb-20">
      <Text className="text-main text-unite-title">Chat</Text>
      <View className="flex-row gap-3 bg-input-bg items-center rounded-xl px-4 py-2">
        <Ionicons name="search-outline" color="#fff" size={24} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={"#fff"}
          className="flex-1 text-main"
        />
      </View>
      <Text className="text-main">My connections</Text>
      <ScrollView contentContainerClassName="gap-3 py-3" className="flex-1">
        {[...chats, ...connections].length > 0 ? (
          <>
            {chats.map((c, i) => {
              //solo son de 2 persona entonces nomas encuentra el que no eres tu
              const otherMember = returnOtherUser(me.id, c.members);
              const validUser = otherMember && typeof otherMember !== "number";
              return (
                <Fragment key={"chat_" + i}>
                  {validUser && (
                    <>
                      <ChatPreview me={me} chats={c} />
                      {(i !== chats.length - 1 || connections.length > 0) && (
                        <View className="h-[1px] bg-neutral-400" />
                      )}
                    </>
                  )}
                </Fragment>
              );
            })}
            {connections.map((c, i) => {
              //solo son de 2 persona entonces nomas encuentra el que no eres tu
              const validUser =
                c.user && typeof c.user !== "number" ? c.user : undefined;
              return (
                <Fragment key={"conn_" + i}>
                  {validUser && (
                    <>
                      <ChatPreview
                        me={me}
                        chats={{ members: [me, validUser] }}
                      />
                      {i !== connections.length - 1 && (
                        <View className="h-[1px] bg-neutral-400" />
                      )}
                    </>
                  )}
                </Fragment>
              );
            })}
          </>
        ) : (
          <Text className="text-main">
            Connect with people to start a chat!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};
