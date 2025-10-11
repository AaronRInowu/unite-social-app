import GradientButton from "@/components/Inputs/GradientButton";
import SlideDownModal from "@/components/Modals/SlideDownModal";
import IonIcons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { FlatList, Linking, Text, TouchableOpacity, View } from "react-native";

export const ShareApp = () => {
  const [openModal, setOpenModal] = useState(false);
  const regularText = `text-white text-xs-custom`;
  const iconProps = { size: 32, color: "#fff" };
  const sharingApps = [
    {
      value: "messages",
      name: "Messages",
      icon: <IonIcons name="chatbubbles" {...iconProps} />,
    },
    {
      value: "wats",
      name: "Whatsapp",
      icon: <IonIcons name="logo-whatsapp" {...iconProps} />,
    },
    {
      value: "insta",
      name: "Instagram",
      icon: <IonIcons name="logo-instagram" {...iconProps} />,
    },
    {
      value: "face",
      name: "Facebook",
      icon: <IonIcons name="logo-facebook" {...iconProps} />,
    },
    {
      value: "mail",
      name: "Mail",
      icon: <IonIcons name="mail-outline" {...iconProps} />,
    },
  ];

  const handleCopy = async (value?: string) => {
    if (value && sharingApps.some((s) => s.value === value)) {
      if (value === "mail") {
        Linking.openURL(
          "mailto:a@a.dev?subject=Join me in unite!&body=Here is my link: no se"
        );
      }
      if (value === "messages") {
        Linking.openURL(
          "sms:a@a.dev?subject=Join me in unite!&body=Here is my link: no se"
        );
      }
      if (value === "wats") {
        Linking.openURL(
          "whatsapp://send?text=Join me in unite, Here is my link: no se"
        );
      }
      //   Platform.OS === "ios"
      //     ? ""
      //     : Linking.openURL("content://com.android.contacts/contacts");
    } else {
      setOpenModal(true);
      await Clipboard.setStringAsync("Unite!");
    }
  };

  return (
    <>
      <View className="gap-7 grow">
        <View className="gap-3">
          <Text className="text-white text-unite-title">
            Share with friends
          </Text>
          <Text className={regularText}>
            Know someone who'd love it here? Send them an invite!
          </Text>
        </View>
        <View className="gap-6">
          <View className="gap-2">
            <Text className={regularText}>Share your link</Text>
            <TouchableOpacity
              onPress={() => handleCopy()}
              activeOpacity={1}
              className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom flex-row justify-between"
            >
              <View className="flex-row gap-3 items-center">
                <IonIcons name="link" color={"#fff"} size={24} />
                <Text className={regularText}>Copy link</Text>
              </View>
              <IonIcons name="documents-outline" color={"#fff"} size={20} />
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            <Text className={regularText}>Share to</Text>
            <FlatList
              contentContainerClassName="gap-7"
              columnWrapperClassName="gap-7"
              numColumns={4}
              data={sharingApps}
              renderItem={({ item }) => {
                return (
                  <View className="gap-2 items-center">
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => handleCopy(item.value)}
                    >
                      <GradientButton
                        style={{ borderRadius: 100, width: 60, height: 60 }}
                      >
                        {item.icon}
                      </GradientButton>
                    </TouchableOpacity>
                    <Text className={`${regularText} text-center`}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
      <SlideDownModal
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
        childrenContainerClass="!bg-white"
        closeColor="#000"
        modalSize={30}
      >
        <View className="">
          <Text className="text-unite-title">🔗 Link copied!</Text>
          <Text className="text-xs-custom font-bold">
            The link has been copied to your clipboard. You can now share it
            with friends, post it anywhere, or save it for later.
          </Text>
        </View>
      </SlideDownModal>
    </>
  );
};
