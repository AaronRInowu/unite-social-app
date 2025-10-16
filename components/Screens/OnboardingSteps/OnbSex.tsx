import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../global/styles/tailwindClasses";
import CheckRadio from "../../Inputs/CheckRadio";
import GradientButton from "../../Inputs/GradientButton";

export default function InsertSex() {
  const [sex, setSex] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const extras = Array.from({ length: 12 }).map((_, i) => `non${i + 1}`);
  const genderSelection = [
    "Prefer not to say",
    "Lesbian",
    "Gay",
    "Bisexual",
    "Queer",
    "Sraight",
    "Other",
  ];

  const handleSelection = (value: string) => {
    if (value === "Other") {
      setOpenSelect(true);
    } else {
      setSex(value);
    }
  };

  const closeModal = () => {
    setOpenSelect(false);
  };

  const handleSaveIdentity = (save?: boolean) => {
    if (!save) {
      setSex("");
    }
    closeModal();
  };

  return (
    <>
      <View style={{ gap: 12 }}>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {genderSelection.map((m, i) => {
            const isSelected = m === "Other" ? extras.includes(sex) : sex === m;
            return (
              <TouchableOpacity
                key={i}
                className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom justify-between items-center flex-row"
                activeOpacity={1}
                onPress={() => handleSelection(m)}
              >
                <Text className="text-main">{m}</Text>
                <CheckRadio
                  style={{ height: 24, marginRight: 8 }}
                  selected={isSelected}
                  onPress={() => handleSelection(m)}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        onRequestClose={() => handleSaveIdentity()}
        visible={openSelect}
        backdropColor={"#00000040"}
      >
        <TouchableOpacity
          style={{
            height: "50%",
          }}
          onPress={() => handleSaveIdentity()}
        />
        <View
          style={{
            marginTop: "auto",
            height: "50%",
            maxHeight: "50%",
            backgroundColor: colors.bgThird,
            padding: 24,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              className="text-main text-lg-custom"
            >
              Sexuality
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleSaveIdentity()}
            >
              <Text className="text-main text-md-custom">
                X
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              gap: 12,
              overflow: "hidden",
              paddingVertical: 12,
            }}
          >
            {extras.map((m, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom justify-between flex-row"
                  onPress={() => handleSelection(m)}
                >
                  <Text className="text-main">{m}</Text>
                  <CheckRadio selected={sex === m} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleSaveIdentity(true)}
          >
            <GradientButton>
              <Text className="text-center text-main">
                Save
              </Text>
            </GradientButton>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
