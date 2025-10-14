import { create } from "zustand";

// Tipos del estado y acciones del onboarding
export type OnboardingStore = {
	// Estado
	step: number;
	totalSteps: number;
	canContinue: boolean;
	submitAction: (() => void) | null;
	// Acciones
	next: () => void;
	prev: () => void;
	reset: () => void;
	setStep: (step: number) => void;
	setTotalSteps: (total: number) => void;
		setCanContinue: (value: boolean) => void;
		setSubmitAction: (fn: (() => void) | null) => void;
};

// Hook principal del store
// - Pensado para sustituir un Context y manejar: next, prev, reset, setStep
const useOnboardingStore = create<OnboardingStore>()(
	/*persist( persistencia temporalmente eliminada */
		(set, get) => ({
			step: 1,
			totalSteps: 10,
			canContinue: true,
			submitAction: null,

			next: () => {
				const { step, totalSteps } = get();
				if (step < totalSteps) {
					set({ step: step + 1 });
				}
			},

			prev: () => {
				const { step } = get();
				if (step > 1) {
					set({ step: step - 1 });
				}
			},

			reset: () => set({ step: 1 }),

			setStep: (newStep) => {
				const { totalSteps } = get();
				const clamped = Math.max(1, Math.min(totalSteps, Math.floor(newStep)));
				set({ step: clamped });
			},

			setTotalSteps: (total) => {
				const safeTotal = Math.max(1, Math.floor(total));
				const { step } = get();
				set({ totalSteps: safeTotal, step: Math.min(step, safeTotal) });
			},
			setCanContinue: (value) => set({ canContinue: value }),
			setSubmitAction: (fn) => set({ submitAction: fn }),
		}),
		/*{
			name: "onboarding-store", // required at minimum
			// Uncomment and configure below if you want to customize persistence
			// partialize: (state) => ({ step: state.step, totalSteps: state.totalSteps }),
			 //storage: createJSONStorage(() => AsyncStorage),
		}
	)*/
);

export default useOnboardingStore;

// utils selects
export const selectStep = (s: OnboardingStore) => s.step;
export const selectTotal = (s: OnboardingStore) => s.totalSteps;
export const selectIsFirst = (s: OnboardingStore) => s.step <= 1;
export const selectIsLast = (s: OnboardingStore) => s.step >= s.totalSteps;
export const selectCanPrev = (s: OnboardingStore) => s.step > 1;
export const selectCanNext = (s: OnboardingStore) => s.step < s.totalSteps;

// Example to use in a component (TypeScript):
// const step = useOnboardingStore(selectStep);
// const next = useOnboardingStore((s) => s.next);
// const canNext = useOnboardingStore(selectCanNext);
// const setStep = useOnboardingStore((s) => s.setStep);

// Example to use in a component (JavaScript):
// const step = useOnboardingStore((s) => s.step);
// const next = useOnboardingStore((s) => s.next);
// const canNext = useOnboardingStore((s) => s.step < s.totalSteps);
// const setStep = useOnboardingStore((s) => s.setStep);

// You can also use the store outside React components:
// import useOnboardingStore from 'path/to/onboarding.storage';
// const { step, next } = useOnboardingStore.getState();