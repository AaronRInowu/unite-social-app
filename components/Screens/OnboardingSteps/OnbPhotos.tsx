import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import AddImage from "../../Inputs/AddImage";
import GradientButton from "../../Inputs/GradientButton";
import SlideDownModal from "../../Modals/SlideDownModal";

export default function InsertGallery() {
  const [infoModal, setInfoModal] = useState(false);

  return (
    <>
      <View style={{ gap: 12 }}>
        <Text className="text-main text-xl-custom">
          A photo helps others get to know you
        </Text>
        <Text className="text-main">
          Uploading a photo makes your profile authentic. You can add or skip
          for now.
        </Text>
        <Text className="text-main">Select 3 photos</Text>
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
          <Text className="text-main">
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
          <Text className="text-main">
            Show your face clearly
          </Text>
          <Text className="text-main">
            Use recent, clear photos where your face is easy to see -- skip the
            filters, sunglasses, or anything that hides who you are.
          </Text>
          <Text className="text-main">
            Use only your own photos
          </Text>
          <Text className="text-main">
            Make sure it&apos;s really you -- no group shots where it&apos;s hard to tell,
            no celebrities, and no fake profiles.
          </Text>
          <Text className="text-main">
            Keep it respectful and real
          </Text>
          <Text className="text-main">
            Avoid offensive or explicit content. Great photos show your
            personality -- like doing something you love or enjoying everyday
            moments.
          </Text>
        </ScrollView>
        <TouchableOpacity
          className="rounded-custom w-full text-center p-btn"
          activeOpacity={1}
          onPress={() => setInfoModal(false)}
        >
          <GradientButton>
            <Text className="text-main text-center">
              Okay, got it
            </Text>
          </GradientButton>
        </TouchableOpacity>
      </SlideDownModal>
    </>
  );
}
