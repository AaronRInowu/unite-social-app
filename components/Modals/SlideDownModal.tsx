import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import { colors } from "../../global/styles/tailwindClasses";

interface IslideDown extends ModalProps {
  title?: string;
  modalSize?: number /* 0 - 100 */;
  childrenContainerClass?: string;
  closeColor?: string;
  containerStyle?: ViewStyle;
  titleClass?: string;
}

export default function SlideDownModal(props: IslideDown) {
  const {
    modalSize = 75,
    title,
    animationType = "slide",
    backdropColor = "#00000040",
    children,
    childrenContainerClass = "",
    closeColor = "#ffffff",
    containerStyle,
    titleClass,
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
          paddingHorizontal: 24,
          paddingBottom: 24,
          paddingTop: 16,
          overflow: "hidden",
          backgroundColor: colors.bgThird,
          ...(containerStyle ?? {}),
        }}
        className={`rounded-t-custom-xl ${childrenContainerClass}`}
      >
        <View style={{ flexDirection: "row" }}>
          {title && (
            <Text className={`text-main text-lg-custom ${titleClass}`}>
              {title}
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={1}
            onPress={rest.onRequestClose}
            style={{ marginLeft: "auto" }}
          >
            <AntIcons name="close-circle" color={closeColor} size={24} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}
