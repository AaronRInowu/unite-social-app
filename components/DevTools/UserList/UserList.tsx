import { MyProfileScreen } from "@/components/Containers/MyProfile/MyProfile";
import GradientButton from "@/components/Inputs/GradientButton";
import { AnswerPrompts } from "@/components/Screens/AnswerPrompts/AnswerPrompts";
import { ChatScreens } from "@/components/Screens/ChatScreens/ChatScreens";
import { SingleChat } from "@/components/Screens/ChatScreens/SingleChat";
import { ConnectionScreen } from "@/components/Screens/ConnectionScreen/ConnectionScreen";
import { EditProfile } from "@/components/Screens/EditProfile/EditProfile";
import { IonlineUsers } from "@/global/interfaces/chats.interface";
import { PromptQuestion } from "@/global/interfaces/promptQuestions.interface";
import { User } from "@/global/interfaces/users.interface";
import { retrieveGeneral } from "@/services/restapi/general.axios";
import { getSocket } from "@/services/socketFunctions";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export const UserList = () => {
  const [openScreen, setOpenScreen] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [questions, setQuestions] = useState<PromptQuestion[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<IonlineUsers[]>([]);
  const selectedUser = users.find((f) => f.id === userId);

  const currentlyWorking = [
    "userPrompts",
    "editpf",
    "connections",
    "profile",
    "chats",
    "singleChat",
  ];

  const getUsers = async () => {
    try {
      const res = await retrieveGeneral<User>("users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getQuestons = async () => {
    try {
      const res = await retrieveGeneral<PromptQuestion>("prompt-questions");
      setQuestions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestons();
    getUsers();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!!socket) {
      socket.emit("register");
      socket.on("new-user", (data: IonlineUsers[]) => {
        setConnectedUsers(data);
      });
      // socket.on("no-access", () => {
      // console.log("?!");
      // setSelectedChat(0);
      // toast.error("No tienes acceso a este chat");
      // });
    }
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ScrollView contentContainerClassName="gap-6 grow">
      {selectedUser ? (
        <>
          {currentlyWorking.includes(openScreen) ? (
            <>
              {openScreen === "singleChat" && <SingleChat me={selectedUser} />}
              {openScreen === "chats" && <ChatScreens me={selectedUser} />}
              {openScreen === "userPrompts" && (
                <AnswerPrompts
                  me={selectedUser}
                  questions={questions}
                  onSuccess={getUsers}
                />
              )}
              {openScreen === "editpf" && <EditProfile me={selectedUser} />}
              {openScreen === "connections" && (
                <ConnectionScreen me={selectedUser} />
              )}
              {openScreen === "profile" && (
                <MyProfileScreen
                  me={selectedUser}
                  questionIds={questions.map((m) => m.id)}
                />
              )}
            </>
          ) : (
            currentlyWorking.map((w, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={i}
                  onPress={() => setOpenScreen(w)}
                >
                  <GradientButton>
                    <Text>{w}</Text>
                  </GradientButton>
                </TouchableOpacity>
              );
            })
          )}
        </>
      ) : users.length > 0 ? (
        <>
          {/* <TouchableOpacity
            activeOpacity={1}
            onPress={() => setUserId(u.id)}
            >
              <GradientButton>
                <Text>Login</Text>
              </GradientButton>
            </TouchableOpacity> */}
          {users.map((u) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={u.id}
                onPress={() => setUserId(u.id)}
              >
                <GradientButton>
                  <Text>{u.firstName}</Text>
                </GradientButton>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <Text className="text-unite-title text-white">
          No se recuperaron usuarios
        </Text>
      )}
    </ScrollView>
  );
};
