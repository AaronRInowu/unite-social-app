import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FaIcons from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SlideDownModal from "../Modals/SlideDownModal";

export default function AddImage({ img }: { img?: string }) {
  const [openUpload, setOpenUpload] = useState(false);
  const [image, setImage] = useState(img);

  const pickImage = async () => {
    //permisos(?)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setOpenUpload(false);
    }
  };

  const removePhoto = () => {
    setImage(undefined);
    setOpenUpload(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpenUpload(true)}
        style={{
          height: 100,
          width: 100,
          borderRadius: 8,
          borderStyle: image ? "solid" : "dashed",
          borderWidth: 1,
          borderColor: "#ffffff80",
          backgroundColor: "#ffffff40",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {image ? (
          <>
            <Image src={image} style={{ width: "100%", height: "100%" }} />
            <View 
              className="absolute bg-info-blue rounded-lg right-0 bottom-0 p-1"
            >
              <MaterialIcons
                name="square-edit-outline"
                size={20}
                color={"#fff"}
              />
            </View>
          </>
        ) : (
          <MaterialIcons name="image-plus-outline" size={20} color={"#fff"} />
        )}
      </TouchableOpacity>
      <SlideDownModal
        modalSize={!image ? 32 : undefined}
        title="Upload a photo"
        visible={openUpload}
        onRequestClose={() => setOpenUpload(false)}
      >
        {image && <Image src={image} style={{ width: "100%", height: 200 }} />}
        <View style={{ gap: 12, marginTop: "auto" }}>
          <Text className="text-main">
            {image
              ? "Do you want to change your photo?"
              : "Choose how you'd like to upload your photo:"}
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom flex-row"
            style={{ gap: 12 }}
          >
            <MaterialIcons
              name="camera-plus-outline"
              size={20}
              color={"#fff"}
            />
            <Text className="text-main">Take a photo</Text>
            <FaIcons
              name="angle-right"
              size={20}
              color={"#fff"}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={1}
            className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom flex-row"
            style={{ gap: 12 }}
          >
            <MaterialIcons name="image-outline" size={20} color={"#Fff"} />
            <Text className="text-main">
              Choose from gallery
            </Text>
            <FaIcons
              name="angle-right"
              size={20}
              color={"#fff"}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removePhoto}
            activeOpacity={1}
            className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom flex-row"
            style={{ gap: 12 }}
          >
            <MaterialIcons name="trash-can-outline" size={20} color={"#Fff"} />
            <Text className="text-main">Remove photo</Text>
            <FaIcons
              name="angle-right"
              size={20}
              color={"#fff"}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </View>
      </SlideDownModal>
    </>
  );
}
