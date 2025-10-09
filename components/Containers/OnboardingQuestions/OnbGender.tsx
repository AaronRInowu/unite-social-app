import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CheckRadio from "../../Inputs/CheckRadio";
import GradientButton from "../../Inputs/GradientButton";
import SlideDownModal from "../../Modals/SlideDownModal";

export default function InsertGender() {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const genderSelection = [
    {
      value: "Man",
      identities: Array.from({ length: 26 }).map((_, i) => `m${i + 1}`),
    },
    {
      value: "Woman",
      identities: Array.from({ length: 2 }).map((_, i) => `w${i + 1}`),
    },
    {
      value: "Non-binary",
      identities: Array.from({ length: 12 }).map((_, i) => `non${i + 1}`),
    },
  ];

  const handleSelection = (value: string) => {
    setSelectedGender(value);
    setOpenSelect(true);
  };

  const handleSimpleSelection = (value: string) => {
    setSelectedIdentity("");
    setSelectedGender(value);
  };

  const closeModal = () => {
    setOpenSelect(false);
  };

  const handleSaveIdentity = (save?: boolean) => {
    if (!save) {
      setSelectedIdentity("");
    }
    closeModal();
  };

  return (
    <>
      <View style={{ gap: 12 }}>
        <Text className="text-main text-xl-custom">
          Which gender best describes you?
        </Text>
        <Text className="text-main">
          We recognize that gender is fluid and personal. Choose what best
          represents you today.
        </Text>
        <View style={{ gap: 8 }}>
          {genderSelection.map((m, i) => {
            const isSelected = selectedGender === m.value;
            return (
              <View
                key={i}
                className="bg-input-bg border border-input-border rounded-custom"
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleSelection(m.value)}
                    className="py-input-y px-input-x"
                    style={{ width: "85%" }}
                  >
                    <Text className="text-main">
                      {m.value}
                    </Text>
                  </TouchableOpacity>
                  <CheckRadio
                    style={{ height: 24, marginRight: 8 }}
                    selected={isSelected}
                    onPress={() =>
                      handleSimpleSelection(isSelected ? "" : m.value)
                    }
                  />
                </View>
                {isSelected && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setOpenSelect(true)}
                    className="py-input-y px-input-x"
                    style={{ width: "85%" }}
                  >
                    <Text className="text-main">
                      {selectedIdentity !== ""
                        ? selectedIdentity
                        : "Add your gender identity > "}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <SlideDownModal
        onRequestClose={() => handleSaveIdentity()}
        visible={openSelect}
        title={`${selectedGender} Identities`}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 12,
            overflow: "hidden",
            paddingVertical: 12,
          }}
        >
          {genderSelection
            .find((f) => f.value === selectedGender)
            ?.identities.map((m, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom justify-between flex-row"
                  onPress={() => setSelectedIdentity(m)}
                >
                  <Text className="text-main">{m}</Text>
                  <CheckRadio selected={selectedIdentity === m} />
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
      </SlideDownModal>
    </>
  );
}
