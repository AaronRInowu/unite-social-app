import { Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import { bgThird } from "../../globals/styles/colors";
import globalStyles from "../../globals/styles/globalStyles";

interface IslideDown extends ModalProps {
  title?: string;
  modalSize?: number /* 0 - 100 */;
}

export default function SlideDownModal(props: IslideDown) {
  const {
    modalSize = 75,
    title,
    animationType = "slide",
    backdropColor = "#00000040",
    children,
    ...rest
  } = props;

  const backdropSize = 100 - modalSize;
  return (
    <Modal
      animationType={animationType}
      backdropColor={backdropColor}
      {...rest}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{
          height: `${backdropSize}%`,
        }}
        onPress={rest.onRequestClose}
      />
      <View
        style={{
          marginTop: "auto",
          height: `${modalSize}%`,
          maxHeight: `${modalSize}%`,
          padding: 24,
          overflow: "hidden",
          backgroundColor: bgThird,
          ...globalStyles.topRadiusXl,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {title && (
            <Text
              style={{ ...globalStyles.mainTextColor, ...globalStyles.textLg }}
            >
              {title}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={1}
            onPress={rest.onRequestClose}
            style={{ marginLeft: "auto" }}
          >
            <AntIcons name="close-circle" color={"#ffffff"} size={24} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}
