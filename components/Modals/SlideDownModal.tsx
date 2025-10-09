import { Modal, ModalProps, Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import { colors } from "../../global/styles/tailwindClasses";

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
          backgroundColor: colors.bgThird,
        }}
        className="rounded-t-custom-xl"
      >
        <View style={{ flexDirection: "row" }}>
          {title && (
            <Text className="text-main text-lg-custom">
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
