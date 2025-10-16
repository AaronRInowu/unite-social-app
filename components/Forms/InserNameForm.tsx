import {
  validateNames,
  ValidateNamesValues,
} from "@/global/schemas/validateNames";
import { useUpdateUser } from "@/hooks/useUsers.hook";
import useAuthStore from "@/store/auth.storage";
import useOnboardingStore from "@/store/onboarding.storage";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInputsGroup from "../Inputs/TextInputsGroup";
type InsertNameFormProps = {
  onValidChange?: (value: boolean) => void;
  registerSubmit?: (fn: () => void) => void;
};

export default function InsertNameForm({
  onValidChange,
  registerSubmit,
}: InsertNameFormProps) {
  const user = useAuthStore((state) => state.user);

  const { mutate } = useUpdateUser({
    onSuccess: () => {
      const { next } = useOnboardingStore.getState();
      next();
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidateNamesValues>({
    resolver: zodResolver(validateNames),
    defaultValues: { first_name: "", last_name: "" },
  });

  const onSubmitNames = React.useCallback(
    (data: ValidateNamesValues) => {
      console.log("[onSubmit] Ejecutado con:", {
        ...data,
        id: user?.id,
      });
      mutate({
        firstName: data.first_name,
        lastName: data.last_name,
        id: user?.id,
      });
    },
    [mutate]
  );

  useEffect(() => {
    if (handleSubmit && onSubmitNames) {
      console.log("Registrando submitAction para InsertNameForm");
      useOnboardingStore.getState().setSubmitAction(() => {
        console.log("[submitAction] Ejecutado");
        handleSubmit(onSubmitNames)();
      });
      registerSubmit?.(() => {
        console.log("[registerSubmit] Ejecutado");
        handleSubmit(onSubmitNames)();
      });
    }
  }, [handleSubmit, onSubmitNames, registerSubmit]);

  useEffect(() => {
    onValidChange?.(!errors.first_name && !errors.last_name);
  }, [errors.first_name, errors.last_name, onValidChange]);

  return (
    <TextInputsGroup
      control={control}
      errors={errors}
      wrapperClassName="w-full"
      inputClassName="px-input-x py-input-y"
      gap={12}
      fields={[
        {
          name: "first_name",
          label: "First name",
          placeholder: "Kevin",
          inputProps: {
            autoCapitalize: "words",
            style: { height: 49 },
            returnKeyType: "next",
          },
        },
        {
          name: "last_name",
          label: "Last name",
          placeholder: "Woolf",
          inputProps: {
            style: { height: 49 },
            autoCapitalize: "words",
            returnKeyType: "done",
          },
        },
      ]}
    />
  );
}
