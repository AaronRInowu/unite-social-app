import { bgThird } from "@/globals/styles/colors";
import globalStyles from "@/globals/styles/globalStyles";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckRadio from "../../inputs/CheckRadio";
import GradientButton from "../../inputs/GradientButton";

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
        <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textXl }}>
          Select your sexuality
        </Text>
        <Text style={{ ...globalStyles.mainTextColor }}>
          Sexuality can be comlpex, evolving, and beautifully unique. Choose
          what reesonates with you in this moment.
        </Text>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {genderSelection.map((m, i) => {
            const isSelected = m === "Other" ? extras.includes(sex) : sex === m;
            return (
              <TouchableOpacity
                key={i}
                style={{
                  ...globalStyles.defaultTextInput,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                activeOpacity={1}
                onPress={() => handleSelection(m)}
              >
                <Text style={{ ...globalStyles.mainTextColor }}>{m}</Text>
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
            backgroundColor: bgThird,
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
              style={{ ...globalStyles.mainTextColor, ...globalStyles.textLg }}
            >
              Sexuality
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleSaveIdentity()}
            >
              <Text
                style={{
                  ...globalStyles.mainTextColor,
                  ...globalStyles.textMd,
                }}
              >
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
                  style={{
                    ...globalStyles.defaultTextInput,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                  onPress={() => handleSelection(m)}
                >
                  <Text style={{ ...globalStyles.mainTextColor }}>{m}</Text>
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
              <Text
                style={{
                  textAlign: "center",
                  ...globalStyles.mainTextColor,
                }}
              >
                Save
              </Text>
            </GradientButton>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
