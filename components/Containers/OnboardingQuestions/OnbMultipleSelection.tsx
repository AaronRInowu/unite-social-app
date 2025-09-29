import globalStyles from "@/globals/styles/globalStyles";
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
  const { borderColor, backgroundColor, borderRadius, ...restStyle } =
    globalStyles.defaultTextInput;

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
      <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textXl }}>
        {headers.title}
      </Text>
      <Text style={{ ...globalStyles.mainTextColor }}>{headers.subtitle}</Text>
      <Text style={{ ...globalStyles.mainTextColor }}>{headers.counter}</Text>
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
              style={{
                ...restStyle,
                borderRadius: 24,
                borderColor: isSelected ? "#ffffff80" : borderColor,
                backgroundColor: isSelected ? "#ffffff80" : backgroundColor,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
              activeOpacity={1}
              onPress={() => handleSelection(m)}
            >
              <Text style={{ ...globalStyles.mainTextColor }}>{m}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
