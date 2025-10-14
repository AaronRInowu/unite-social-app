
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, type NativeScrollEvent, type NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native"
import SlideDownModal from "./SlideDownModal"

const ITEM_HEIGHT = 36
const VISIBLE_ITEMS = 5
const PADDING_ITEMS = Math.floor(VISIBLE_ITEMS / 2)
const TOP_GAP = 12
const HIGHLIGHT_TOP = ITEM_HEIGHT * (VISIBLE_ITEMS - 1) / 2
const WHEEL_SHIFT = HIGHLIGHT_TOP - TOP_GAP
const FADE_HEIGHT_TOP = TOP_GAP + ITEM_HEIGHT * 0.6
const FADE_HEIGHT_BOTTOM = ITEM_HEIGHT * 1.2

type WheelPickerProps<T> = {
  data: T[]
  selectedIndex: number
  onValueChange: (value: T, index: number) => void
  renderLabel: (value: T) => string
  testID?: string
}

function WheelPicker<T>({ data, selectedIndex, onValueChange, renderLabel, testID }: WheelPickerProps<T>) {
  const listRef = useRef<FlatList<T>>(null)

  useEffect(() => {
    const offset = selectedIndex * ITEM_HEIGHT
    listRef.current?.scrollToOffset({ offset, animated: false })
  }, [selectedIndex, data.length])

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset } = event.nativeEvent
      const index = Math.round(contentOffset.y / ITEM_HEIGHT)
      const safeIndex = Math.max(0, Math.min(data.length - 1, index))
      onValueChange(data[safeIndex], safeIndex)
    },
    [data, onValueChange],
  )

  return (
    <View
      style={{
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        flex: 1,
      }}
    >
      <FlatList
        ref={listRef}
        data={data}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        keyExtractor={(_, index) => `${index}`}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * PADDING_ITEMS,
        }}
        onMomentumScrollEnd={handleMomentumEnd}
        getItemLayout={(_, index) => ({
          index,
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
        })}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex
          return (
            <View
              style={{
                height: ITEM_HEIGHT,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                testID={testID ? `${testID}-${index}` : undefined}
                style={{
                  fontSize: 18,
                  fontFamily: isSelected ? "Satoshi-Bold" : "Satoshi-Regular",
                  color: isSelected ? "#0F0A2C" : "#0F0A2C70",
                }}
              >
                {renderLabel(item)}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}

type BirthDatePickerModalProps = {
  visible: boolean
  onRequestClose: () => void
  initialDate?: Date
  onConfirm: (date: Date) => void
  minYear?: number
  maxYear?: number
}

const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

export default function BirthDatePickerModal({
  visible,
  onRequestClose,
  initialDate,
  onConfirm,
  minYear = 1980,
  maxYear = new Date().getFullYear(),
}: BirthDatePickerModalProps) {
  const safeInitial = useMemo(() => {
    if (initialDate) return initialDate
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }, [initialDate])

  const years = useMemo(() => {
    const list: number[] = []
    for (let year = minYear; year <= maxYear; year += 1) {
      list.push(year)
    }
    return list
  }, [maxYear, minYear])

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(safeInitial.getMonth())
  const [selectedYearIndex, setSelectedYearIndex] = useState(() => {
    const idx = years.indexOf(safeInitial.getFullYear())
    return idx >= 0 ? idx : Math.max(0, years.length - 1)
  })
  const [selectedDayIndex, setSelectedDayIndex] = useState(safeInitial.getDate() - 1)

  useEffect(() => {
    if (!visible) {
      return
    }

    const month = safeInitial.getMonth()
    setSelectedMonthIndex(month)

    const yearIndex = years.indexOf(safeInitial.getFullYear())
    setSelectedYearIndex(yearIndex >= 0 ? yearIndex : Math.max(0, years.length - 1))
    setSelectedDayIndex(safeInitial.getDate() - 1)
  }, [visible, safeInitial, years])

  const daysInMonth = useMemo(() => {
    const year = years[selectedYearIndex] ?? safeInitial.getFullYear()
    const month = selectedMonthIndex
    const total = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: total }, (_, index) => index + 1)
  }, [selectedMonthIndex, selectedYearIndex, years, safeInitial])

  useEffect(() => {
    if (selectedDayIndex >= daysInMonth.length) {
      setSelectedDayIndex(daysInMonth.length - 1)
    }
  }, [daysInMonth, selectedDayIndex])

  const handleConfirm = useCallback(() => {
    const year = years[selectedYearIndex] ?? maxYear
    const month = selectedMonthIndex
    const day = daysInMonth[selectedDayIndex] ?? daysInMonth[daysInMonth.length - 1]
    onConfirm(new Date(year, month, day))
    onRequestClose()
  }, [daysInMonth, maxYear, onConfirm, onRequestClose, selectedDayIndex, selectedMonthIndex, selectedYearIndex, years])

  return (
    <SlideDownModal
      visible={visible}
      onRequestClose={onRequestClose}
      modalSize={65}
      animationType="slide"
      backdropColor="#00000099"
      transparent
      containerStyle={{
        backgroundColor: "#FFFFFF",
        paddingTop: TOP_GAP,
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
      closeColor="#0F0A2C"
    >
      <View style={{ flex: 1, paddingBottom: 16, display: 'flex',  height: '100%' }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Satoshi-Bold",
            fontSize: 20,
            color: "#0F0A2C",
          }}
        >
          Date of birth
        </Text>

        <View
          style={{
            position: "relative",
            height: ITEM_HEIGHT * VISIBLE_ITEMS,
            overflow: "hidden",
            marginTop: 12,
          }}
        >
          <LinearGradient
            pointerEvents="none"
            colors={["#FFFFFF", "#FFFFFFAA", "rgba(255,255,255,0)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              top: 0,
              height: FADE_HEIGHT_TOP,
              zIndex: 10,
            }}
          />
          <LinearGradient
            pointerEvents="none"
            colors={["rgba(255,255,255,0)", "#FFFFFFAA", "#FFFFFF"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              bottom: 0,
              height: FADE_HEIGHT_BOTTOM,
              zIndex: 10,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              height: ITEM_HEIGHT * VISIBLE_ITEMS,
              paddingHorizontal: 4,
              marginTop: -WHEEL_SHIFT,
            }}
          >
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: HIGHLIGHT_TOP,
                left: 4,
                right: 4,
                height: ITEM_HEIGHT,
                borderRadius: 12,
                backgroundColor: "rgba(15,10,44,0.08)",
              }}
            />

            <WheelPicker
              data={MONTHS}
              selectedIndex={selectedMonthIndex}
              onValueChange={(_, index) => setSelectedMonthIndex(index)}
              renderLabel={(value) => value}
              testID="month"
            />
            <WheelPicker
              data={daysInMonth}
              selectedIndex={selectedDayIndex}
              onValueChange={(_, index) => setSelectedDayIndex(index)}
              renderLabel={(value) => value.toString()}
              testID="day"
            />
            <WheelPicker
              data={years}
              selectedIndex={selectedYearIndex}
              onValueChange={(_, index) => setSelectedYearIndex(index)}
              renderLabel={(value) => value.toString()}
              testID="year"
            />
          </View>
        </View>

        <View style={{ marginTop: 16, paddingHorizontal: 20 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleConfirm}
            style={{
              paddingVertical: 14,
              borderRadius: 16,
              backgroundColor: "#1C1845",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontFamily: "Satoshi-Medium",
              }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SlideDownModal>
  )
}
