import type { User } from "@/global/interfaces/users.interface";
import {
  verifyOtpSchema,
  VerifyOtpValues,
} from "@/global/schemas/validatePhoneNumber";
import { IAuthResponse, useVerifyOtp } from "@/hooks/userSendPhone.hook";
import { sendOtpMessage } from "@/services/restapi/users/users.axios";
import useAuthStore from "@/store/auth.storage";
import useOnboardingStore from "@/store/onboarding.storage";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import SlideDownModal from "../Modals/SlideDownModal";

export default function VerificationCodeForm({
  onValidChange,
  registerSubmit,
}: {
  onValidChange?: (v: boolean) => void;
  registerSubmit?: (fn: () => void) => void;
}) {
  const { phone } = useOnboardingStore.getState();
  const [error, setError] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const setSession = useAuthStore((state) => state.setSession);

  const handleAuthSuccess = useCallback(
    (payload: IAuthResponse) => {
      setIsSuccess(true);
      const { next } = useOnboardingStore.getState();
      console.log("payload", payload);
      const data =
        typeof payload?.data === "object" && payload?.data !== null
          ? (payload.data as Record<string, unknown>)
          : undefined;

      const userCandidate =
        (payload.user as unknown) ?? (data?.user as unknown);
      const user =
        userCandidate && typeof userCandidate === "object"
          ? (userCandidate as User)
          : undefined;

      const accessToken =
        (typeof payload.accessToken === "string" && payload.accessToken) ||
        (typeof payload.token === "string" && payload.token) ||
        (typeof data?.accessToken === "string" && data.accessToken) ||
        (typeof data?.token === "string" && data.token);

      const refreshToken =
        (typeof payload.refreshToken === "string" && payload.refreshToken) ||
        (typeof data?.refreshToken === "string" && data.refreshToken) ||
        null;

      if (user && typeof accessToken === "string" && accessToken.length > 0) {
        setSession({
          user,
          accessToken,
          refreshToken,
        });
      }

      next();
    },
    [setSession]
  );

  const { mutate } = useVerifyOtp({
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      setError(true);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpValues>({
    mode: "onChange",
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { code: "" },
  });

  const onSubmitVerification = useCallback(
    (data: VerifyOtpValues) => {
      mutate({ code: data.code, phone });
    },
    [mutate]
  );

  useEffect(() => {
    if (handleSubmit && onSubmitVerification) {
      console.log("Registrando submitAction para PhoneNumberForm");
      useOnboardingStore.getState().setSubmitAction(() => {
        console.log("[submitAction] Ejecutado");
        handleSubmit(onSubmitVerification)();
      });
      if (registerSubmit) {
        registerSubmit(() => {
          console.log("[registerSubmit] Ejecutado");
          handleSubmit(onSubmitVerification)();
        });
      }
    }
  }, [handleSubmit, onSubmitVerification, registerSubmit]);

  // Controlar habilitación del botón Continue según validez
  useEffect(() => {
    onValidChange?.(!errors.code);
    // al montar, deshabilitar si no hay valor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.code]);

  const handleResendCode = async () => {
    setIsResend(true);
    try {
      const res = await sendOtpMessage(phone);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <View style={{ gap: 12 }}>
      <Controller
        control={control}
        name="code"
        rules={{ required: true, minLength: 4 }}
        render={({ field: { onChange } }) => (
          <View className="w-full" style={{ gap: 8, paddingTop: 10 }}>
            <Text className="text-main text-xs-custom font-satoshi-bold">
              Verification code
            </Text>
            <OtpInput
              numberOfDigits={6}
              onTextChange={onChange}
              placeholder="-"
              theme={{
                containerStyle: {
                  width: "auto",
                  justifyContent: "space-between",
                },
                pinCodeContainerStyle: {
                  height: 60,
                  width: 50,
                  borderRadius: 12,
                  borderWidth: 0,
                  paddingHorizontal: 16,
                  backgroundColor: "#ffffff1A",
                  marginRight: 8,
                },
                pinCodeTextStyle: {
                  color: "#ffffff",
                  fontSize: 23,
                  fontFamily: "Satoshi-Medium",
                },
                placeholderTextStyle: {
                  color: "#ffffff40",
                  fontSize: 23,
                  fontFamily: "Satoshi-Medium",
                },
              }}
            />
            <View className="flex-row gap-[10px]">
              <Text className="text-main text-xs-custom font-satoshi-bold">
                Didn’t get a code?
              </Text>
              <TouchableOpacity onPress={handleResendCode}>
                <Text className="text-main text-xs-custom font-satoshi-bold underline">
                  Resend code
                </Text>
              </TouchableOpacity>
            </View>
            {errors.code && (
              <Text className="text-red-500">
                Code is required and must be 6 digits
              </Text>
            )}
          </View>
        )}
      />
      <SlideDownModal
        onRequestClose={() => {
          setError(false);
        }}
        visible={error}
        childrenContainerClass="bg-white"
        modalSize={20}
        closeColor="#655d5d90"
      >
        <View style={{ gap: 20 }}>
          <Text className="font-satoshi-bold text-lg-custom">
            ⚠️ Oops! Invalid code
          </Text>
          <Text className="font-satoshi-bold text-xs-custom">
            Your code has expired or isn’t correct. Please enter a new one.
          </Text>
        </View>
      </SlideDownModal>
      <SlideDownModal
        onRequestClose={() => {
          setIsResend(false);
        }}
        visible={isResend}
        childrenContainerClass="bg-white"
        modalSize={25}
        closeColor="#655d5d90"
      >
        <View style={{ gap: 20 }}>
          <Text className="font-satoshi-bold text-lg-custom">
            ✅ Your authentication code is on its way!
          </Text>
          <Text className="font-satoshi-bold text-xs-custom">
            A 6-digit code has been sent to {phone}. Please check your messages
            and enter it below.
          </Text>
        </View>
      </SlideDownModal>
      <SlideDownModal
        onRequestClose={() => {
          setIsSuccess(false);
        }}
        visible={isSuccess}
        childrenContainerClass="bg-white"
        modalSize={20}
        closeColor="#655d5d90"
      >
        <View style={{ gap: 20 }}>
          <Text className="font-satoshi-bold text-lg-custom">
            🎉 You’re all set!
          </Text>
          <Text className="font-satoshi-bold text-xs-custom">
            Your account is ready. Let’s get to know you better.
          </Text>
        </View>
      </SlideDownModal>
    </View>
  );
}
