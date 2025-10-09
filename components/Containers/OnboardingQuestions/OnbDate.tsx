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
      <Text className="text-lg-custom text-main">
        Please enter your date of birth
      </Text>
      <Text className="text-xs-custom text-main">
        We use your birthday to confirm you meet the age requirement. Once
        saved, it can&apos;t be changed.
      </Text>
      <TouchableOpacity
        onPress={() => setOpenDate(!openDate)}
        activeOpacity={1}
        className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom"
      >
        <View style={{ flexDirection: "row" }}>
          <Text className="text-main">
            {selectedDate ? selectedDate.toLocaleDateString("es") : "Pick date"}
          </Text>
          <Text className="text-main ml-auto">
            {">"}
          </Text>
        </View>
      </TouchableOpacity>
      {openDate && <DatePicker value={validDate} onChange={handleBirth} />}
    </View>
  );
}
