import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GradientButton from "../../Inputs/GradientButton";

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
      <Text className="text-main text-lg-custom">
        Share with friends
      </Text>
      <Text className="text-main">
        Know someone who&apos;d love it here? Send them an invite!
      </Text>
      <View style={{ marginTop: "auto", paddingBottom: 24, gap: 12 }}>
        <Text className="text-main">Share your link</Text>
        <TouchableOpacity
          onPress={handleCopy}
          activeOpacity={1}
          className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom flex-row"
          style={{ gap: 12 }}
        >
          <MaterialIcons name="link" color={"#fff"} size={20} />
          <Text className="text-main">Copy link</Text>
          <MaterialIcons
            name={tempConfirm ? "battery-check-outline" : "content-copy"}
            color={"#fff"}
            size={20}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
        <Text className="text-main">Share to</Text>
        <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
          {shareApps.map((m, index) => {
            return (
              <TouchableOpacity
                key={index}
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
                <Text className="text-main">{m.value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
