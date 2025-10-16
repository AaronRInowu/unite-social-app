import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import z from "zod";
import SlideDownModal from "../SlideDownModal";

type Modal = {
  open: boolean;
  close: () => void;
  value: (value: string) => void;
};
export default function FullNameModal({ open, close, value }: Modal) {
  const fullNameSchema = z.object({
    firstName: z.string().nonempty({ error: "First name is required" }),
    lastName: z.string().nonempty({ error: "Last name is required" }),
  });

  type FullNameFormType = z.infer<typeof fullNameSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FullNameFormType>({
    resolver: zodResolver(fullNameSchema),
  });

  const onSubmit: SubmitHandler<FullNameFormType> = (
    data: FullNameFormType
  ) => {
    value(data.firstName);
    reset();
    close();
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
        Full name
      </Text>
      <View style={{ gap: 12 }}>
        <Text className="text-[bg-third] text-xs-custom font-[600]">
          First Name
        </Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder="Placeholder"
              placeholderTextColor="#ffffff6c"
              className="bg-input-bg text-main py-[14px] px-input-x rounded-custom"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text style={{ color: "#ff8566" }}>{errors.firstName.message}</Text>
        )}
        <Text className="text-[bg-third] text-xs-custom font-[600]">
          Last Name
        </Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder="Placeholder"
              placeholderTextColor="#ffffff6c"
              className="bg-input-bg text-main py-[14px] px-input-x rounded-custom"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text style={{ color: "#ff8566" }}>{errors.lastName.message}</Text>
        )}
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
