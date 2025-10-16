import VerificationCodeForm from "@/components/Forms/VerificationCodeForm";
import { View } from "react-native";

export default function OnbVerification(props: any) {
  return (
    <View style={{ gap: 20 }}>
      <VerificationCodeForm {...props} />
    </View>
  );
}
