import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import SlideDownModal from "../SlideDownModal";

type Modal = {
  open: boolean;
  close: () => void;
  value: (value: string[]) => void;
  list: string[];
  title: string;
};

type Chips = {
  selected: boolean;
  value: string;
};
export default function VibesModal({ open, close, value, list, title }: Modal) {
  const [selectVibes, setSelectVibes] = useState<Array<Chips>>([]);

  useEffect(() => {
    let array: Chips[] = [];
    for (let v of list) {
      array.push({ selected: false, value: "" });
    }
    setSelectVibes(array);
  }, [list]);

  const handleSelects = (v: string, i: number) => {
    selectVibes[i].selected = !selectVibes[i].selected;
    selectVibes[i].value = v;
    setSelectVibes([...selectVibes]);
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
        {title}
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {list.map((x, i) => {
          return (
            <TouchableOpacity
              key={"vibe" + i}
              onPress={() => {
                handleSelects(x, i);
              }}
            >
              <View
                className="bg-input-bg w-[180px] py-3 rounded-[20px] my-1.5"
                style={{
                  backgroundColor: selectVibes[i]?.selected
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
          value(selectVibes.filter((x) => x.selected).map((x) => x.value));
          close();
        }}
      >
        <Text className="text-center text-main font-satoshi-bold text-[16px]">
          Save
        </Text>
      </TouchableOpacity>
    </SlideDownModal>
  );
}
