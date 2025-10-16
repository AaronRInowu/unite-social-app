import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";

interface IslideDown extends ModalProps {
  title?: string;
  modalSize?: number /* 0 - 100 */;
  childrenContainerClass?: string;
  closeColor?: string;
  containerStyle?: ViewStyle;
}

export default function SlideDownModal(props: IslideDown) {
  const {
    modalSize = 75,
    title,
    animationType = "slide",
    backdropColor = "#00000070",
    children,
    childrenContainerClass = "",
    closeColor = "#ffffff",
    containerStyle,
    ...rest
  } = props;

  const backdropSize = 100 - modalSize;
  return (
    <Modal
      animationType={animationType}
      backdropColor={backdropColor}
      transparent={true}
      {...rest}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={{
          height: `${backdropSize}%`,
          backgroundColor: backdropColor,
        }}
        onPress={rest.onRequestClose}
      />
      <View
        style={{
          marginTop: "auto",
          height: `${modalSize}%`,
          maxHeight: `${modalSize}%`,
          paddingHorizontal: 24,
          paddingBottom: 24,
          paddingTop: 16,
          overflow: "hidden",
          // backgroundColor: colors.bgThird,
          ...(containerStyle ?? {}),
        }}
        className={`rounded-t-custom-xl ${childrenContainerClass}`}
      >
        <View style={{ flexDirection: "row" }}>
          {title && <Text className="text-main text-lg-custom">{title}</Text>}
          <TouchableOpacity
            activeOpacity={1}
            onPress={rest.onRequestClose}
            style={{ marginLeft: "auto" }}
          >
            <AntIcons name="close" color={closeColor} size={18} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}
