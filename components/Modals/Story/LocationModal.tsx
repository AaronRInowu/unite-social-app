import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import z from "zod";
import SlideDownModal from "../SlideDownModal";

type Modal = {
  open: boolean;
  close: () => void;
  value: (value: string) => void;
};
export default function LocationNameModal({ open, close, value }: Modal) {
  const schema = z.object({
    location: z.string().nonempty({ error: "Location is required" }),
  });

  type FormType = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormType> = (data: FormType) => {
    value(data.location);
    reset();
    close();
  };

  const handlePlaceSelect = (place: any) => {
    console.log("Selected place:", place);
  };

  return (
    <SlideDownModal
      onRequestClose={() => {
        close();
      }}
      visible={open}
      className="bg-white"
    >
      <Text className="h-[100px] text-[bg-third] text-lg-custom text-center">
        Location
      </Text>
      <View style={{ gap: 12 }}>
        <Text className="text-[bg-third] text-xs-custom font-[600]">
          Find your city
        </Text>
        <View className="bg-input-bg rounded-custom">
          {/* <GooglePlacesTextInput
            apiKey="AIzaSyAMgn7Ey3mTwa6ijXmAFu2eXFQnI1EYyaY"
            onPlaceSelect={handlePlaceSelect}
          /> */}
          {/* <Controller
            control={control}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View className="flex-row items-center px-6 gap-[10px]">
                <SearchNormal1 size="20" color="rgb(21,3,52);" />
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="#ffffff6c"
                  className="text-main py-[14px]"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </View>
            )}
            name="location"
          />
          {errors.location && (
          )} */}
        </View>
        <TouchableOpacity
          className="py-4 bg-gradient-1 rounded-[12px] my-3"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-main font-satoshi-bold text-[16px]">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SlideDownModal>
  );
}
