import classNames from "classnames";
import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  get,
} from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type FieldConfig<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  helperText?: string;
  placeholderTextColor?: string;
  inputProps?: TextInputProps;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

type TextInputsGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  fields: FieldConfig<TFieldValues>[];
  gap?: number;
  wrapperClassName?: string;
  renderError?: (message?: string) => React.ReactNode;
  inputClassName?: string;
};

const DEFAULT_PLACEHOLDER_COLOR = "#ffffff70";

export function TextInputsGroup<TFieldValues extends FieldValues>({
  control,
  errors,
  fields,
  gap = 12,
  wrapperClassName,
  renderError,
  inputClassName: defaultInputClassName,
}: TextInputsGroupProps<TFieldValues>) {
  return (
    <View className={wrapperClassName} style={{ gap }}>
      {fields.map((fieldConfig) => {
        const {
          name,
          label,
          placeholder,
          helperText,
          inputProps,
          placeholderTextColor,
          containerClassName,
          labelClassName,
          inputClassName: fieldInputClassName,
          errorClassName,
        } = fieldConfig;

        const fieldError = errors
          ? (get(errors, name) as FieldError | undefined)
          : undefined;
        const errorMessage = fieldError?.message as string | undefined;

        return (
          <View
            key={String(name)}
            className={containerClassName ?? "w-full"}
            style={{ gap: 8 }}
          >
            <Text
              className={classNames(
                "text-main text-xs-custom font-satoshi-medium",
                labelClassName
              )}
            >
              {label}
            </Text>
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, onBlur, value } }) => {
                const stringValue =
                  typeof value === "string" ? value : value ?? "";
                return (
                  <TextInput
                    value={stringValue}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={
                      placeholderTextColor ?? DEFAULT_PLACEHOLDER_COLOR
                    }
                    className={classNames(
                      "w-full rounded-custom bg-input-bg text-main font-satoshi-medium",
                      defaultInputClassName,
                      fieldInputClassName
                    )}
                    {...inputProps}
                  />
                );
              }}
            />
            {helperText && !errorMessage ? (
              <Text className="text-main text-xs">{helperText}</Text>
            ) : null}
            {errorMessage
              ? renderError?.(errorMessage) ?? (
                <Text
                  className={classNames(
                    "text-red-500 text-xs font-satoshi-medium",
                    errorClassName
                  )}
                >
                  {errorMessage}
                </Text>
              )
              : null}
          </View>
        );
      })}
    </View>
  );
}

export default TextInputsGroup;
