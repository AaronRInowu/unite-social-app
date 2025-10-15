import GradientButton from "@/components/Inputs/GradientButton";
import { ItempUserTry } from "@/global/interfaces/general.interface";
import { PromptQuestion } from "@/global/interfaces/promptQuestions.interface";
import {
  ValidateAnswer,
  validatePromptAnswer,
} from "@/global/schemas/validatePrompt";
import { axiosInstance } from "@/services/restapi/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft2 } from "iconsax-react-nativejs";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ddd extends ItempUserTry {
  questions: PromptQuestion[];
  onSuccess?: () => void;
}

export const AnswerPrompts = ({ me, questions, onSuccess }: ddd) => {
  const areaClasses =
    "w-full rounded-custom bg-input-bg text-main font-satoshi-medium h-[120px] align-top px-4";
  const defaultVals = questions
    .sort((a, b) => a.id - b.id)
    .map((q) => {
      const getAnswer = me.answers?.docs?.find((f) =>
        typeof f === "number"
          ? false
          : typeof f.question === "number"
            ? f.question
            : f.question.id === q.id
      );
      return {
        qId: q.id,
        answer:
          getAnswer && typeof getAnswer !== "number" ? getAnswer.content : "",
        ...(getAnswer && {
          answerId: typeof getAnswer === "number" ? getAnswer : getAnswer.id,
        }),
      };
    });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ValidateAnswer>({
    resolver: zodResolver(validatePromptAnswer),
    defaultValues: {
      answers: defaultVals,
    },
  });

  useEffect(() => {
    setValue("answers", defaultVals);
  }, [me]);

  const onSubmit = async (data: ValidateAnswer) => {
    console.log(data.answers);
    const hasDataArr = data.answers
      .filter((f) => f.answer !== "")
      .map(({ answer, qId, answerId }) => {
        return {
          question: qId,
          content: answer,
          user: me.id,
          answerId,
        };
      });
    await Promise.allSettled(
      hasDataArr.map((m) => {
        const { answerId, ...rest } = m;
        if (!!answerId) {
          return axiosInstance.patch(`/prompt-answer/${answerId}`, rest);
        } else {
          return axiosInstance.post("prompt-answer", m);
        }
      })
    );
    if (onSuccess) onSuccess();
  };

  return (
    <ScrollView className="pb-20" contentContainerClassName="gap-6 grow">
      <View className="gap-3">
        <View className="flex-row gap-3 items-center">
          <ArrowLeft2 color="#fff" size={20} />
          <Text className="text-main text-unite-title">About me</Text>
        </View>
        <Text className="text-main">
          Filling out prompts is optional, but you’ll need to fill all to unlock
          the chat.
        </Text>
      </View>
      <View className="gap-10 grow">
        {questions.length > 0 ? (
          questions.map((m, index) => {
            return (
              <Controller
                key={m.id}
                control={control}
                name={`answers.${index}.answer`}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <View className="gap-2">
                      <Text className="text-main">{m.content}</Text>
                      <TextInput
                        className={areaClasses}
                        multiline
                        placeholder="Type your answer..."
                        placeholderTextColor={"#cacaca"}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        maxLength={125}
                      />
                      <Text className="text-main text-right">
                        {value && value.length ? value.length : 0}
                        /125
                      </Text>
                    </View>
                  );
                }}
              />
            );
          })
        ) : (
          <Text className="text-main">No prompts found to answer.</Text>
        )}
        {questions.length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            className="rounded-xl overflow-hidden mt-auto"
            onPress={handleSubmit(onSubmit)}
          >
            <GradientButton>
              <Text className="text-main text-center">Save</Text>
            </GradientButton>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};
