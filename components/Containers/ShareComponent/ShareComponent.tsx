import globalStyles from "@/globals/styles/globalStyles";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../../inputs/GradientButton";

export default function ShareComponent() {
  const [tempConfirm, setTempConfirm] = useState(false);

  const handleCopy = () => {
    setTempConfirm(true);
    setTimeout(() => {
      setTempConfirm(false);
    }, 800);
  };

  const shareApps = [
    {
      value: "Messages",
      icon: "message-reply-text-outline",
    },
    {
      value: "Whatsapp",
      icon: "whatsapp",
    },
    {
      value: "Instagram",
      icon: "instagram",
    },
    {
      value: "Facebook",
      icon: "facebook",
    },
    {
      value: "Mail",
      icon: "mail",
    },
    {
      value: "Copy link",
      icon: "link",
    },
  ];

  return (
    <View style={{ flexGrow: 1 }}>
      <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textLg }}>
        Share with friends
      </Text>
      <Text style={{ ...globalStyles.mainTextColor }}>
        Know someone who'd love it here? Send them an invite!
      </Text>
      <View style={{ marginTop: "auto", paddingBottom: 24, gap: 12 }}>
        <Text style={{ ...globalStyles.mainTextColor }}>Share your link</Text>
        <TouchableOpacity
          onPress={handleCopy}
          activeOpacity={1}
          style={{
            ...globalStyles.defaultTextInput,
            flexDirection: "row",
            gap: 12,
          }}
        >
          <MaterialIcons name="link" color={"#fff"} size={20} />
          <Text style={{ ...globalStyles.mainTextColor }}>Copy link</Text>
          <MaterialIcons
            name={tempConfirm ? "battery-check-outline" : "content-copy"}
            color={"#fff"}
            size={20}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
        <Text style={{ ...globalStyles.mainTextColor }}>Share to</Text>
        <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
          {shareApps.map((m) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  gap: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    aspectRatio: 1,
                  }}
                >
                  <GradientButton>
                    <MaterialIcons name={m.icon} size={28} color={"#fff"} />
                  </GradientButton>
                </View>
                <Text style={{ ...globalStyles.mainTextColor }}>{m.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
