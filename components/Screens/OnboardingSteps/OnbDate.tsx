import BirthDatePickerModal from "@/components/Modals/BirthDatePickerModal";
import { ArrowRight2, Calendar } from "iconsax-react-nativejs";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function InsertBirth() {
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <View style={{ gap: 12 }}>
      <TouchableOpacity
        onPress={() => setOpenDate(true)}
        activeOpacity={1}
        className="border border-input-border bg-input-bg text-main py-input-y px-input-x rounded-custom"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 8 }}>
            <Calendar size="22" color="#ffffffff" />
            <Text className="text-main text-xs-custom font-satoshi-bold">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Pick date"}
            </Text>
          </View>
          <ArrowRight2
            size="20"
            fill="none"
            color="#ffffff84"
            strokeWidth={1.5}
          />
        </View>
      </TouchableOpacity>
      <BirthDatePickerModal
        visible={openDate}
        initialDate={selectedDate}
        onRequestClose={() => setOpenDate(false)}
        onConfirm={(date) => {
          setSelectedDate(date);
          setOpenDate(false);
        }}
      />
    </View>
  );
}
