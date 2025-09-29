import globalStyles from "@/globals/styles/globalStyles";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import SlideDownModal from "../../Modals/SlideDownModal";
import AddImage from "../../inputs/AddImage";
import GradientButton from "../../inputs/GradientButton";

export default function InsertGallery() {
  const [infoModal, setInfoModal] = useState(false);

  return (
    <>
      <View style={{ gap: 12 }}>
        <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textXl }}>
          A photo helps others get to know you
        </Text>
        <Text style={{ ...globalStyles.mainTextColor }}>
          Uploading a photo makes your profile authentic. You can add or skip
          for now.
        </Text>
        <Text style={{ ...globalStyles.mainTextColor }}>Select 3 photos</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {Array.from({ length: 3 }).map((_, i) => {
            return <AddImage key={i} />;
          })}
        </View>
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 12 }}
          activeOpacity={1}
          onPress={() => setInfoModal(true)}
        >
          <AntIcons name="info-circle" size={20} color={"#fff"} />
          <Text style={{ ...globalStyles.mainTextColor }}>
            Need help choosing your photos
          </Text>
        </TouchableOpacity>
      </View>
      <SlideDownModal
        onRequestClose={() => setInfoModal(false)}
        visible={infoModal}
        title="Photo upload tips"
      >
        <ScrollView contentContainerStyle={{ gap: 24 }}>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Show your face clearly
          </Text>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Use recent, clear photos where your face is easy to see -- skip the
            filters, sunglasses, or anything that hides who you are.
          </Text>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Use only your own photos
          </Text>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Make sure it's really you -- no group shots where it's hard to tell,
            no celebrities, and no fake profiles.
          </Text>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Keep it respectful and real
          </Text>
          <Text style={{ ...globalStyles.mainTextColor }}>
            Avoid offensive or explicit content. Great photos show your
            personality -- like doing something you love or enjoying everyday
            moments.
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={{ ...globalStyles.regularBtnStyle }}
          activeOpacity={1}
          onPress={() => setInfoModal(false)}
        >
          <GradientButton>
            <Text
              style={{ ...globalStyles.mainTextColor, textAlign: "center" }}
            >
              Okay, got it
            </Text>
          </GradientButton>
        </TouchableOpacity>
      </SlideDownModal>
    </>
  );
}
