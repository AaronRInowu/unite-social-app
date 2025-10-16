import OnbParentContainer from "@/components/Screens/OnboardingSteps/OnbParentContainer";
import { stateMachine } from "@/onboarding/machine/stateMachine.workflow";
import useOnboardingStore, {
  selectedPhone,
  selectStep,
  selectTotal,
} from "@/store/onboarding.storage";
import React, { useMemo } from "react";

// Renderiza dinámicamente el componente según el step usando la state machine
export default function StepContainer({
  handleSteps,
}: {
  handleSteps: (type: "rest" | "add") => Promise<void>;
}) {
  const step = useOnboardingStore(selectStep);
  const phone = useOnboardingStore(selectedPhone);
  const totalSteps = useOnboardingStore(selectTotal);
  const setCanContinue = useOnboardingStore((s) => s.setCanContinue);
  const setSubmitAction = useOnboardingStore((s) => s.setSubmitAction);

  const entry = useMemo(() => {
    return Object.values(stateMachine.states).find((s) => s.NUMBER === step);
  }, [step]);

  if (!entry || !entry.COMPONENT) return null;

  const Component = entry.COMPONENT;
  const wrapper = entry.PROPS?.wrapper ?? {};
  const componentProps = {
    onValidChange: (isValid: boolean) => setCanContinue(isValid),
    registerSubmit: (fn: () => void) => setSubmitAction(fn),
    ...(entry.PROPS?.component ?? {}),
  };

  const { title, subtitle, viewProgressBar = true } = wrapper;

  return (
    <OnbParentContainer
      title={title ?? ""}
      subtitle={subtitle}
      viewProgressBar={viewProgressBar}
      handleSteps={handleSteps}
      onboardingStep={step}
      totalSteps={totalSteps}
      phone={phone}
    >
      <Component {...componentProps} />
    </OnbParentContainer>
  );
}
