import { Link, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import * as YUP from "yup";
import { axiosInstance } from "../../../services/axiosConfig";
import GradientButton from "../../Inputs/GradientButton";
import PageLayout from "../../layout/appBg";

export default function SignUpPage() {
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: YUP.object().shape({
      phone: YUP.string().required("Please enter a phone."),
    }),
    onSubmit: async () => {
      setLoader(true);
      try {
        const res = await axiosInstance.post("/");
        router.push("/onboarding");
      } catch (error) {
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <PageLayout style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 24 }}>
        <View style={{ gap: 12 }}>
          <Text
            className="text-main text-lg-custom"
          >
            What&apos;s your phone number?
          </Text>
          <Text
            className="text-main"
          >
            We&apos;ll use your phone number to verify your account.
          </Text>
        </View>
        <View style={{ gap: 12 }}>
          <Text
            className="text-main"
          >
            Phone number
          </Text>
          <PhoneInput
            defaultCode="US"
            layout="first"
            containerStyle={{
              paddingVertical: 0,
              backgroundColor: "#ffffff20",
              borderRadius: 16,
              borderWidth: 2,
              borderColor: "#ffffff40",
            }}
            textInputProps={{ placeholderTextColor: "#ffffff80" }}
            textContainerStyle={{ backgroundColor: "#00000000" }}
            codeTextStyle={{ color: "#ffffff80" }}
            textInputStyle={{ color: "#ffffff80" }}
          />
          <Text
            className="text-main"
          >
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Your phone number is just for verification and keeping your account
            secure, never shown on your profile.
          </Text>
        </View>
      </View>
      <View style={{ gap: 12, paddingInline: 24 }}>
        <GradientButton>
          <Link
            href={"/onboarding"}
            className="text-main text-xs-custom text-center"
          >
            Continue
          </Link>
        </GradientButton>
      </View>
    </PageLayout>
  );
}
