import PhoneNumberForm from "@/components/Forms/PhoneNumberForm";
import { View } from "react-native";

export default function InsertPhone(props:any) {
  return (
    <View style={{ gap: 20 }}>
      <PhoneNumberForm {...props} />
    </View>
  );
}