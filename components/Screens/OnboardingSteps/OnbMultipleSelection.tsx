import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ChooseMany({
  headers,
  options,
}: {
  options: string[];
  headers: { title: string; subtitle: string; counter: string };
}) {
  const [chosenVibes, setChoseVibes] = useState<string[]>([]);

  const handleSelection = (value: string) => {
    setChoseVibes((prev) => {
      if (prev.includes(value)) {
        return prev.filter((f) => f !== value);
      } else {
        if (prev.length > 2) {
          return [value, prev[0], prev[1]];
        } else {
          return [value, ...prev];
        }
      }
    });
  };

  return (
    <View
      style={{
        gap: 12,
        maxHeight: "95%",
      }}
    >
      <Text className="text-main text-xl-custom">
        {headers.title}
      </Text>
      <Text className="text-main">{headers.subtitle}</Text>
      <Text className="text-main">{headers.counter}</Text>
      <ScrollView
        contentContainerStyle={{
          gap: 8,
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: 1,
        }}
      >
        {options.map((m, i) => {
          const isSelected = chosenVibes.includes(m);
          return (
            <TouchableOpacity
              key={i}
              className={`py-input-y px-input-x rounded-3xl justify-between items-center flex-row ${
                isSelected 
                  ? 'border border-white/50 bg-white/50' 
                  : 'border border-input-border bg-input-bg'
              }`}
              activeOpacity={1}
              onPress={() => handleSelection(m)}
            >
              <Text className="text-main">{m}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
