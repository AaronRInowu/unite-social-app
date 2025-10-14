import type { User } from "@/global/interfaces/users.interface";
import { verifyOtpSchema, VerifyOtpValues } from "@/global/schemas/validatePhoneNumber";
import { IAuthResponse, useVerifyOtp } from "@/hooks/userSendPhone.hook";
import useAuthStore from "@/store/auth.storage";
import useOnboardingStore from "@/store/onboarding.storage";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";


export default function VerificationCodeForm({
  onValidChange,
  registerSubmit,
}: {
  onValidChange?: (v: boolean) => void;
  registerSubmit?: (fn: () => void) => void;
}) {
  const setSession = useAuthStore((state) => state.setSession);

  const handleAuthSuccess = useCallback(
    (payload: IAuthResponse) => {
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
      console.log("error", error);
    },
  });

  const { control, handleSubmit, formState: { errors } } = useForm<VerifyOtpValues>({
    mode: "onChange",
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { code: "" },
  });

  const onSubmitVerification = useCallback((data: VerifyOtpValues) => {
    mutate({ code: data.code, phone: '+5213141021984' });
  }, [mutate]);

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

  return (
    <View style={{ gap: 12 }}>
      <Controller
        control={control}
        name="code"
        rules={{ required: true, minLength: 4 }}
        render={({ field: { onChange } }) => (
          <View className="w-full" style={{ gap: 8 }}>
            <Text className="text-main text-xs-custom font-satoshi-medium">Verification code</Text>
            <OtpInput
              numberOfDigits={6} onTextChange={onChange}
              placeholder="-"
              theme={{
                containerStyle: { width: "auto", justifyContent: "flex-start" },
                pinCodeContainerStyle: {
                  height: 60,
                  width: 50,
                  borderRadius: 12,
                  borderWidth: 0,
                  paddingHorizontal: 16,
                  backgroundColor: "#ffffff1A",
                  marginRight: 8
                },
                pinCodeTextStyle: { color: "#ffffff", fontSize: 23, fontFamily: "Satoshi-Medium" },
                placeholderTextStyle: { color: "#ffffff40", fontSize: 23, fontFamily: "Satoshi-Medium" }
              }}
            />
            {errors.code && <Text className="text-red-500">Code is required and must be 6 digits</Text>}
          </View>

        )}
      />
    </View>
  );
}
