import GradientButton from "@/components/Inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft2 } from "iconsax-react-nativejs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
export default function EventScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log(id);

  const eventSchema = z.object({
    title: z.string().nonempty({ error: "Title is required" }),
    category: z.string().optional(),
  });

  type EventFormType = z.infer<typeof eventSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormType>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit: SubmitHandler<EventFormType> = (data: EventFormType) => {
    console.log(data);
  };

  return (
    <PageLayout style={{ gap: 20 }}>
      <View className="flex flex-row gap-[10px] items-center">
        <ArrowLeft2 size="20" color="#ffffffff" onPress={router.back} />
        <Text className="text-main text-lg-custom font-[600]">
          Create event
        </Text>
      </View>
      <View style={{ gap: 12 }}>
        <Text className="text-main text-xs-custom font-[600]">Title</Text>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder="Headline goes here"
              placeholderTextColor="#ffffff6c"
              className=" bg-input-bg text-main py-[14px] px-input-x rounded-custom"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={{ color: "#ff8566" }}>{errors.title.message}</Text>
        )}
      </View>
      <View className="flex-row gap-[10] w-full">
        <TouchableOpacity className="text-main flex-1 border border-white rounded-custom flex justify-center items-center">
          <Text className="text-main font-satoshi-bold text-xs-custom">
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1" onPress={handleSubmit(onSubmit)}>
          <GradientButton
            style={{
              borderRadius: 12,
              padding: 15,
            }}
          >
            <Text className="text-main text-xs-custom text-center font-satoshi-bold">
              Publish
            </Text>
          </GradientButton>
        </TouchableOpacity>
      </View>
    </PageLayout>
  );
}
