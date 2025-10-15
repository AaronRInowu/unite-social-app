import { ConnectionScreen } from "@/components/Containers/ConnectionScreen/ConnectionScreen";
import { MyProfileScreen } from "@/components/Containers/MyProfile/MyProfile";
import GradientButton from "@/components/Inputs/GradientButton";
import { AnswerPrompts } from "@/components/Screens/AnswerPrompts/AnswerPrompts";
import { EditProfile } from "@/components/Screens/EditProfile/EditProfile";
import { PromptQuestion } from "@/global/interfaces/promptQuestions.interface";
import { User } from "@/global/interfaces/users.interface";
import { retrieveGeneral } from "@/services/restapi/general.axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export const UserList = () => {
  const [openScreen, setOpenScreen] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [questions, setQuestions] = useState<PromptQuestion[]>([]);
  const selectedUser = users.find((f) => f.id === userId);

  const currentlyWorking = ["userPrompts", "editpf", "connections", "profile"];

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

  return (
    <ScrollView contentContainerClassName="gap-6 grow">
      {selectedUser ? (
        <>
          {currentlyWorking.includes(openScreen) ? (
            <>
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
        users.map((u) => {
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
        })
      ) : (
        <Text className="text-unite-title text-white">
          No se recuperaron usuarios
        </Text>
      )}
    </ScrollView>
  );
};
