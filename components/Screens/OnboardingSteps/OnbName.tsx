import InsertNameForm from "@/components/Forms/InserNameForm";
import { View } from "react-native";

export default function InsertName(props:any) {
  return (
    <>
      <View style={{ gap: 12 }}>
        <InsertNameForm {...props} />
      </View>
    </>
  );
}
