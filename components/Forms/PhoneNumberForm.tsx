import {
  ValidatePhoneValues,
  validatePhoneSchema,
} from "@/global/schemas/validatePhoneNumber";
import { useSendOtpMessage } from "@/hooks/userSendPhone.hook";
import useOnboardingStore from "@/store/onboarding.storage";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import SlideDownModal from "../Modals/SlideDownModal";

export default function PhoneNumberForm({
  onValidChange,
  registerSubmit,
}: {
  onValidChange?: (v: boolean) => void;
  registerSubmit?: (fn: () => void) => void;
}) {
  const [open, setIsOpen] = useState(false);
  const setPhone = useOnboardingStore((s) => s.setPhone);

  const { mutate } = useSendOtpMessage({
    onSuccess: () => {
      const { next } = useOnboardingStore.getState();
      setIsOpen(true);
      setTimeout(() => {
        next();
      }, 1000);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidatePhoneValues>({
    resolver: zodResolver(validatePhoneSchema),
    defaultValues: { phone_number: "" },
  });

  const onSubmit = React.useCallback(
    (data: ValidatePhoneValues) => {
      console.log("[onSubmit] Ejecutado con:", data);
      setPhone(data.phone_number);
      mutate({ phone: data.phone_number });
    },
    [mutate]
  );

  useEffect(() => {
    // Solo registra el submitAction si handleSubmit y onSubmit están definidos
    if (handleSubmit && onSubmit) {
      console.log("Registrando submitAction para PhoneNumberForm");
      useOnboardingStore.getState().setSubmitAction(() => {
        console.log("[submitAction] Ejecutado");
        handleSubmit(onSubmit)();
      });
      if (registerSubmit) {
        registerSubmit(() => {
          console.log("[registerSubmit] Ejecutado");
          handleSubmit(onSubmit)();
        });
      }
    }
  }, [handleSubmit, onSubmit, registerSubmit]);

  // Controlar habilitación del botón Continue según validez
  useEffect(() => {
    onValidChange?.(!errors.phone_number);
    // al montar, deshabilitar si no hay valor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.phone_number]);

  return (
    <>
      {/** iOS clean look: sin barra accesoria */}
      <Controller
        control={control}
        name="phone_number"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View className="w-full" style={{ gap: 8 }}>
            <Text className="text-main text-xs-custom font-satoshi-medium mt-2">
              Phone number
            </Text>
            <PhoneInput
              defaultCode="US"
              layout="first"
              value={value}
              onChangeFormattedText={onChange}
              containerStyle={{
                width: "100%",
                height: 48,
                paddingVertical: 0,
                backgroundColor: "#ffffff20",
                borderRadius: 12,
                borderWidth: 2,
                borderColor: "transparent",
              }}
              textInputProps={{
                placeholder: "(XXX) XXX-XXXX",
                placeholderTextColor: "#ffffff80",
                keyboardType: "number-pad",
                returnKeyType: "done",
                keyboardAppearance: "dark",
                blurOnSubmit: true,
              }}
              textContainerStyle={{
                backgroundColor: "transparent",
                paddingVertical: 0,
                borderRadius: 16,
                height: "100%",
              }}
              codeTextStyle={{ color: "#ffffff80" }}
              textInputStyle={{ color: "#ffffff80" }}
              flagButtonStyle={{ backgroundColor: "transparent" }}
            />
            <Text
              style={{ color: "white" }}
              className="font-satoshi-medium text-justify text-sm"
            >
              By continuing, you agree to our Terms of Service and Privacy
              Policy. Your phone number is just for verification and keeping
              your account secure, never shown on your profile.
            </Text>
          </View>
        )}
      />
      {errors.phone_number && (
        <Text className="text-red-500">{errors.phone_number.message}</Text>
      )}
      <SlideDownModal
        onRequestClose={() => {
          setIsOpen(false);
        }}
        visible={open}
        childrenContainerClass="bg-white"
        modalSize={25}
        closeColor="#655d5d90"
      >
        <View style={{ gap: 20 }}>
          <Text className="font-satoshi-bold text-lg-custom">
            ✅ Your authentication code is on its way!
          </Text>
          <Text>
            A 6-digit code has been sent to +52 XXX-XXX-XX. Please check your
            messages and enter it below.
          </Text>
        </View>
      </SlideDownModal>
    </>
  );
}
