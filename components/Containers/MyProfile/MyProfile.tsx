import { CheckSwitch } from "@/components/Inputs/CheckSwitch";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ocitcons from "@expo/vector-icons/Octicons";
import {
  ArrowRight2,
  Book1,
  Edit,
  Global,
  InfoCircle,
  Logout,
  People,
} from "iconsax-react-nativejs";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const MyProfileScreen = () => {
  const [notifState, setNotifState] = useState(false);
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
      <Text className="text-white text-unite-title">Settings</Text>
      <TouchableOpacity
        activeOpacity={1}
        className="bg-neutral-400 rounded-xl p-3 flex-row items-center gap-3"
      >
        <View className="w-[60px] aspect-square bg-pink-600 rounded-full"></View>
        <View className="grow">
          <Text className="text-white text-2xl">Nombre Apellido</Text>
          <Text className="text-amber-300">Ubicacion</Text>
        </View>
        <Edit color="#fff" />
      </TouchableOpacity>
      <View className="gap-7 border-b border-neutral-500 pb-3">
        <Text className="text-white text-2xl">Connections</Text>
        <View className="flex-row gap-3 justify-evenly py-4">
          <View className="items-center">
            <Global color="#fff" />
            <Text className="text-white">All</Text>
            <Text className="text-white text-3xl">35</Text>
          </View>
          <View className="items-center">
            <Ionicons
              name="flash-outline"
              size={20}
              className="shrink-0"
              color={"#fff"}
            />
            <Text className="text-white">Spark</Text>
            <Text className="text-white text-3xl">15</Text>
          </View>
          <View className="items-center">
            <Ionicons
              name="calendar-clear-outline"
              size={20}
              className="shrink-0"
              color={"#fff"}
            />
            <Text className="text-white">Events</Text>
            <Text className="text-white text-3xl">20</Text>
          </View>
        </View>
      </View>
      <View className="gap-7 border-b border-neutral-500 pb-3">
        <Text className="text-white text-2xl">Profile</Text>
        <View className="items-center gap-3 py-4 gap-6">
          {profileButtons.map((p) => {
            return (
              <TouchableOpacity
                key={p.value}
                activeOpacity={1}
                className="items-center flex-row grow justify-between w-[85%]"
              >
                <View className="flex-row gap-3">
                  {p.icon}
                  <Text className="text-white">{p.name}</Text>
                </View>
                {p.value === "about" ? (
                  <InfoCircle color="#f00" />
                ) : (
                  <ArrowRight2 color="#FFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="gap-7 pb-3">
        <Text className="text-white text-2xl">App and Account</Text>
        <View className="items-center gap-3 py-4 gap-6">
          {accountButtons.map((p) => {
            return (
              <TouchableOpacity
                key={p.value}
                activeOpacity={1}
                className="items-center flex-row grow justify-between w-[85%]"
              >
                <View className="flex-row gap-3">
                  {p.icon}
                  <Text className="text-white">{p.name}</Text>
                </View>
                {p.value === "notif" ? (
                  <CheckSwitch
                    selected={notifState}
                    onPress={() => setNotifState(!notifState)}
                  />
                ) : (
                  <ArrowRight2 color="#FFF" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};
