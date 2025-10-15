import GradientButton from "@/components/Inputs/GradientButton";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const GalleryTips = ({
  closeModal,
  bgWhite,
}: {
  closeModal?: () => void;
  bgWhite?: boolean;
}) => {
  const textColor = bgWhite ? "" : "text-main";
  return (
    <>
      <ScrollView contentContainerStyle={{ gap: 24 }}>
        <View>
          <Text className={`${textColor} text-2xl font-semibold`}>
            📸 Show your face clearly
          </Text>
          <Text className={`${textColor} font-semibold`}>
            Use recent, clear photos where your face is easy to see -- skip the
            filters, sunglasses, or anything that hides who you are.
          </Text>
        </View>
        <View>
          <Text className={`${textColor} text-2xl font-semibold`}>
            🪞 Use only your own photos
          </Text>
          <Text className={`${textColor} font-semibold`}>
            Make sure it&apos;s really you -- no group shots where it&apos;s
            hard to tell, no celebrities, and no fake profiles.
          </Text>
        </View>
        <View>
          <Text className={`${textColor} text-2xl font-semibold`}>
            ✨ Keep it respectful and real
          </Text>
          <Text className={`${textColor} font-semibold`}>
            Avoid offensive or explicit content. Great photos show your
            personality -- like doing something you love or enjoying everyday
            moments.
          </Text>
        </View>
      </ScrollView>
      {closeModal && (
        <TouchableOpacity
          className="rounded-xl w-full text-center overflow-hidden"
          activeOpacity={1}
          onPress={closeModal}
        >
          <GradientButton>
            <Text className={`text-main text-center`}>Okay, got it</Text>
          </GradientButton>
        </TouchableOpacity>
      )}
    </>
  );
};
