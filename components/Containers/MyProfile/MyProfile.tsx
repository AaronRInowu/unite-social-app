import { CheckSwitch } from "@/components/Inputs/CheckSwitch";
import GradientButton from "@/components/Inputs/GradientButton";
import { tempuser } from "@/global/interfaces/general.interface";
import { retrieveGeneral } from "@/services/general.axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ocitcons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import {
  ArrowRight2,
  Book1,
  Edit,
  Global,
  InfoCircle,
  Logout,
  People,
} from "iconsax-react-nativejs";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { UserViewContainer } from "../UserViewContainer/UserViewContainer";

export const MyProfileScreen = () => {
  const [users, setUsers] = useState<tempuser[]>([]);
  const [questionsIds, setQuestionsIds] = useState<number[] | undefined>();
  const [selectedUser, setSelectedUser] = useState<tempuser>();
  const [notifState, setNotifState] = useState(false);
  const userAnswers = selectedUser?.answers.docs
    ? selectedUser.answers.docs.map((m) => m.id)
    : [];
  const allPromptsFilled =
    !questionsIds || !questionsIds.some((q) => !userAnswers.includes(q));

  const getUsers = async () => {
    try {
      const res = await retrieveGeneral<tempuser>("users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getQuestons = async () => {
    try {
      const res = await retrieveGeneral<{ id: number }>("prompt-questions");
      setQuestionsIds(res.data.map((m) => m.id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getQuestons();
  }, []);

  const handleLogs = async () => {
    try {
      // const res = await axiosInstance.post("users/logout");
      // setIsLogged(false);
      // console.log(res.data);
      // router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleTouches = async (option: string) => {
    switch (option) {
      case "bye":
        await handleLogs();
        break;
      case "delete":
        break;
      default:
        break;
    }
  };

  const profileButtons = [
    { value: "story", name: "Update story", icon: <Book1 color="#fff" /> },
    { value: "about", name: "About me", icon: <Edit color="#fff" /> },
    {
      value: "event",
      name: "My events",
      icon: <Ionicons name="calendar-clear-outline" size={24} color="#fff" />,
    },
    {
      value: "conn",
      name: "Connections",
      icon: <People variant="TwoTone" color="#fff" />,
    },
  ];
  const accountButtons = [
    {
      value: "notif",
      name: "Notifications",
      icon: <Ocitcons name="bell" color="#fff" size={20} />,
    },
    {
      value: "delete",
      name: "Delete account",
      icon: <Ocitcons name="trash" color="#fff" size={20} />,
    },
    {
      value: "bye",
      name: "Logout",
      icon: <Logout color="#fff" size={24} />,
    },
  ];

  return (
    <ScrollView contentContainerClassName="gap-6 pb-20">
      {selectedUser ? (
        <>
          <Text className="text-white text-unite-title">Settings</Text>
          <UserViewContainer user={selectedUser}>
            <TouchableOpacity activeOpacity={1}>
              <Edit color="#fff" />
            </TouchableOpacity>
          </UserViewContainer>
          <View className="gap-7 border-b border-neutral-500 pb-3">
            <Text className="text-white text-2xl">Connections</Text>
            <View className="flex-row gap-3 justify-evenly py-4">
              <View className="items-center gap-3">
                <Global color="#fff" />
                <Text className="text-neutral-400">All</Text>
                <Text className="text-white text-3xl">
                  {selectedUser.connections.docs.length ?? 0}
                </Text>
              </View>
              <View className="items-center gap-3">
                <Ionicons
                  name="flash-outline"
                  size={20}
                  className="shrink-0"
                  color={"#fff"}
                />
                <Text className="text-neutral-400">Spark</Text>
                <Text className="text-white text-3xl">
                  {selectedUser.connections.docs.length ?? 0}
                </Text>
              </View>
              <View className="items-center gap-3">
                <Ionicons
                  name="calendar-clear-outline"
                  size={20}
                  className="shrink-0"
                  color={"#fff"}
                />
                <Text className="text-neutral-400">Events</Text>
                <Text className="text-white text-3xl">{0}</Text>
                {/* por definir que cuenta como conexion de evento */}
              </View>
            </View>
          </View>
          <View className="gap-7 border-b border-neutral-500 pb-3">
            <Text className="text-white text-2xl">Profile</Text>
            <View className="items-center gap-3 py-4 gap-6">
              {profileButtons.map((p) => {
                return (
                  <Link href={"/"} key={p.value} className="w-[85%]">
                    <View className="items-center flex-row grow justify-between w-full">
                      <View className="flex-row gap-3">
                        {p.icon}
                        <Text className="text-white">{p.name}</Text>
                      </View>
                      {p.value === "about" && !allPromptsFilled ? (
                        <InfoCircle color="#f00" />
                      ) : (
                        <ArrowRight2 color="#FFF" />
                      )}
                    </View>
                  </Link>
                );
              })}
            </View>
          </View>
          <View className="gap-7 pb-3">
            <Text className="text-white text-2xl">App and Account</Text>
            <View className="items-center gap-3 py-4 gap-6">
              {accountButtons.map((p) => {
                return p.value === "notif" ? (
                  <View
                    key={p.value}
                    className="items-center flex-row grow justify-between w-[85%]"
                  >
                    <View className="flex-row gap-3">
                      {p.icon}
                      <Text className="text-white">{p.name}</Text>
                    </View>
                    <CheckSwitch
                      selected={notifState}
                      onPress={() => setNotifState(!notifState)}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    key={p.value}
                    activeOpacity={1}
                    onPress={() => handleTouches(p.value)}
                    className="items-center flex-row grow justify-between w-[85%]"
                  >
                    <View className="flex-row gap-3">
                      {p.icon}
                      <Text className="text-white">{p.name}</Text>
                    </View>
                    <ArrowRight2 color="#FFF" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </>
      ) : users.length > 0 ? (
        users.map((u) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={u.id}
              onPress={() => setSelectedUser(u)}
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
