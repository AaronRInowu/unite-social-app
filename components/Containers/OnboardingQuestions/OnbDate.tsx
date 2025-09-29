import globalStyles from "@/globals/styles/globalStyles";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function InsertBirth() {
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const validDate = selectedDate ?? new Date();

  const handleBirth = (e: DateTimePickerEvent) => {
    const { nativeEvent } = e;
    const checkDate = new Date(nativeEvent.timestamp);
    setSelectedDate(checkDate);
  };

  return (
    <View style={{ gap: 12 }}>
      <Text
        style={{
          ...globalStyles.textLg,
          ...globalStyles.mainTextColor,
        }}
      >
        Please enter your date of birth
      </Text>
      <Text
        style={{
          ...globalStyles.textXs,
          ...globalStyles.mainTextColor,
        }}
      >
        We use your birthday to confirm you meet the age requirement. Once
        saved, it can't be changed.
      </Text>
      <TouchableOpacity
        onPress={() => setOpenDate(!openDate)}
        activeOpacity={1}
        style={{ ...globalStyles.defaultTextInput }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...globalStyles.mainTextColor }}>
            {selectedDate ? selectedDate.toLocaleDateString("es") : "Pick date"}
          </Text>
          <Text style={{ ...globalStyles.mainTextColor, marginLeft: "auto" }}>
            {">"}
          </Text>
        </View>
      </TouchableOpacity>
      {openDate && <DatePicker value={validDate} onChange={handleBirth} />}
    </View>
  );
}
