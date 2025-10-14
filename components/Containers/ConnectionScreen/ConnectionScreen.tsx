import GradientButton from "@/components/Inputs/GradientButton";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { UserViewContainer } from "../UserViewContainer/UserViewContainer";

export const ConnectionScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const filters = ["all", "sparks", "events"];

  return (
    <View className="gap-6 flex-1 pb-20">
      <Text className="text-unite-title text-white">Connections</Text>
      <View className="flex-row justify-evenly">
        {filters.map((f) => {
          return (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFilter(f)}
              activeOpacity={1}
              className="border-b border-neutral-500 grow relative"
            >
              <Text className="capitalize text-white text-center text-xs-custom pb-3">
                {f}
              </Text>
              <GradientButton
                className="absolute p-0 !h-[2px] top-[100%]"
                colors={
                  selectedFilter === f
                    ? undefined
                    : ["transparent", "transparent"]
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView contentContainerClassName="gap-6" className="grow">
        {Array.from({ length: 12 }).map((_, i) => {
          return (
            <UserViewContainer
              key={i}
              classnames={{
                container: "p-6",
                subtitle: "text-sm !text-neutral-400",
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                className="rounded-xl overflow-hidden"
              >
                <GradientButton>
                  <Text className="text-white">Message {i}</Text>
                </GradientButton>
              </TouchableOpacity>
            </UserViewContainer>
          );
        })}
      </ScrollView>
    </View>
  );
};
