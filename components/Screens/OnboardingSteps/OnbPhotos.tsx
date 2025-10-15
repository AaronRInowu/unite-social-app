import { GalleryTips } from "@/components/Containers/GalleryTips/GalleryTips";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import AddImage from "../../Inputs/AddImage";
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
          <Text className="text-main">Need help choosing your photos</Text>
        </TouchableOpacity>
      </View>
      <SlideDownModal
        onRequestClose={() => setInfoModal(false)}
        visible={infoModal}
        title="Photo upload tips"
      >
        <GalleryTips closeModal={() => setInfoModal(false)} />
      </SlideDownModal>
    </>
  );
}
