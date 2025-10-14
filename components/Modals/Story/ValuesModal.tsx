import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SlideDownModal from "../SlideDownModal";

type Modal = {
  open: boolean;
  close: () => void;
  value: (value: string[]) => void;
};

type Chips = {
  selected: boolean;
  value: string;
};
export default function ValuesModal({ open, close, value }: Modal) {
  const [selectValues, setSelectValues] = useState<Array<Chips>>([]);
  const values = [
    "Main character 🎬",
    "Consent ✋",
    "Creativity 🎨",
    "Ambition 🚀",
    "Acceptance 🤗",
    "Main character 🎬",
    "Consent ✋",
    "Creativity 🎨",
    "Ambition 🚀",
    "Acceptance 🤗",
  ];

  useEffect(() => {
    let array: Chips[] = [];
    for (let v of values) {
      array.push({ selected: false, value: "" });
    }
    setSelectValues(array);
  }, []);

  const handleSelects = (v: string, i: number) => {
    selectValues[i].selected = !selectValues[i].selected;
    selectValues[i].value = v;
    setSelectValues([...selectValues]);
  };

  return (
    <SlideDownModal
      onRequestClose={() => {
        close();
      }}
      visible={open}
      className="bg-white"
    >
      <Text className="p-5 text-[bg-third] text-lg-custom text-center">
        Your core values
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {values.map((x, i) => {
          return (
            <TouchableOpacity
              key={"values" + i}
              onPress={() => {
                handleSelects(x, i);
              }}
            >
              <View
                className="bg-input-bg w-[180px] py-3 rounded-[20px] my-1.5"
                style={{
                  backgroundColor: selectValues[i]?.selected
                    ? "#fff"
                    : "#FFFFFF26",
                }}
              >
                <Text className="text-center text-[16px]">{x}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        className="py-4 bg-gradient-1 rounded-[12px] my-3 w-full"
        onPress={() => {
          value(selectValues.filter((x) => x.selected).map((x) => x.value));
        }}
      >
        <Text className="text-center text-main font-satoshi-bold text-[16px]">
          Save
        </Text>
      </TouchableOpacity>
    </SlideDownModal>
  );
}
