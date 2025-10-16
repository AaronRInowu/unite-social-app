import GradientButton from "@/components/Inputs/GradientButton";
import PageLayout from "@/components/layout/appBg";
import StepContainer from "@/components/Screens/OnboardingSteps/StepContainer";
import { stateMachine } from "@/onboarding/machine/stateMachine.workflow";
import useOnboardingStore, {
  selectStep,
  selectTotal,
} from "@/store/onboarding.storage";
import { useRouter } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function OnboardingPage() {
  const router = useRouter();
  const step = useOnboardingStore(selectStep);
  const totalSteps = useOnboardingStore(selectTotal);
  const setTotalSteps = useOnboardingStore((s) => s.setTotalSteps);
  const canContinue = useOnboardingStore((s) => s.canContinue);
  const submitAction = useOnboardingStore((s) => s.submitAction);
  const next = useOnboardingStore((s) => s.next);
  const prev = useOnboardingStore((s) => s.prev);
  const [kbVisible, setKbVisible] = React.useState(false);
  const insets = useSafeAreaInsets();

  const handleSteps = async (type: "rest" | "add") => {
    try {
      if (type === "add") {
        if (step === totalSteps) {
          router.push("/signup");
          return;
        }
      } else {
        if (type === "rest" && step == 1) {
          router.back();
          return;
        } else {
          prev();
        }
      }
    } catch {}
  };

  // Sincroniza totalSteps con la state machine
  React.useEffect(() => {
    const visibleSteps = Object.values(stateMachine.states)
      .filter((s) => s.PROPS?.wrapper?.viewProgressBar !== false)
      .map((s) => s.NUMBER);
    const max = Math.max(...visibleSteps);
    if (Number.isFinite(max)) setTotalSteps(max);
  }, [setTotalSteps]);

  // Detectar teclado para ajustar paddings superiores
  React.useEffect(() => {
    const showEvt =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvt, () => setKbVisible(true));
    const hideSub = Keyboard.addListener(hideEvt, () => setKbVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const returnStep = () => <StepContainer handleSteps={handleSteps} />;

  return (
    <PageLayout
      style={{
        paddingTop: kbVisible ? 16 : 48,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + 8 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            {returnStep()}
            {/* Fixed footer (outside the ScrollView) */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                console.log("onPress Continue");
                //Keyboard.dismiss();
                if (submitAction) {
                  console.log("Calling submitAction");
                  submitAction();
                } else {
                  next();
                }
              }}
              //disabled={!canContinue}
            >
              <GradientButton
                style={{
                  borderRadius: 12,
                  padding: 15,
                  width: "100%",
                  opacity: canContinue ? 1 : 0.5,
                }}
              >
                <Text className="text-main text-xs-custom text-center font-satoshi-medium">
                  Continue
                </Text>
              </GradientButton>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageLayout>
  );
}
