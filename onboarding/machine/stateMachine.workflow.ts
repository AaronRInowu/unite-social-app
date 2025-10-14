import Index from "@/app";
import InsertBirth from "@/components/Screens/OnboardingSteps/OnbDate";
import InsertGender from "@/components/Screens/OnboardingSteps/OnbGender";
import ChooseMany from "@/components/Screens/OnboardingSteps/OnbMultipleSelection";
import InsertName from "@/components/Screens/OnboardingSteps/OnbName";
import InsertPhone from "@/components/Screens/OnboardingSteps/OnbPhone";
import InsertGallery from "@/components/Screens/OnboardingSteps/OnbPhotos";
import InsertSex from "@/components/Screens/OnboardingSteps/OnbSex";
import OnbVerification from "@/components/Screens/OnboardingSteps/OnbVerification";
import ShareComponent from "@/components/Screens/ShareComponent/ShareComponent";
import React from "react";


export type StateMachineDefinition = Record<"states", Record<Steps, State>>;

interface State {
    NEXT: Steps | ((choice: string) => Steps);
    PREV: Steps | ((choice: string) => Steps) | null;
    NUMBER: number; // número de paso visible en la UI
    COMPONENT: React.ComponentType<any> | null; // componente a renderizar para el paso
    PROPS: {
        // Props pensadas para el wrapper OnbParentContainer
        wrapper?: {
            title?: string;
            subtitle?: string;
            viewProgressBar?: boolean;
        };
        // Props que se pasan al componente interno
        component?: Record<string, any>;
    };
};

export type Stepss =
    | "checkIn"
    | "dangerousGood"
    | "scanPassport"
    | "alertBaggage"
    | "selectPerson"
    | "confirmData"
    | "securityQuestionsLiquids"
    | "preCheckIn"
    | "changeSeat"
    | "alertLiquids"
    | "securityQuestionsBaggage"
    | "baggageCounter"
    | "bookingNumber"
    | "printingBagTag"
    | "printingBoardingPass"
    | "finalStep";

export type Steps =
    | "phoneNumberVerification"
    | "enterVerificationCode"
    | "yourNameAndLastName"
    | "yourBirthDate"
    | "yourGender"
    | "yourSexuality"
    | "yourVibes"
    | "yourCoreValues"
    | "yourTypeConnections"
    | "yourTypeEvents"
    | "yourProfilePhotos"
    | "shareWithFriends"
    | "splash";


// Opciones simuladas (puedes moverlas a un archivo de constantes si prefieres)
const vibes = [
    "Adventurous","Authentic","Bold","Chill","Creative","Curious","Electric","Empathetic","Expressive","Flirty","Free-Spirited","Glow‑Up","Grounded","Guarded","Healing","Inclusive","Independent","Lonely","Loyal","Magnetic","Main‑Character","Open-Minded","Passionate","Playful","Proud","Rebellious","Reflective","Slay","Sober","Soft","Soulful","Spicy","Vibrant","Witty",
];

export const stateMachine: StateMachineDefinition = {
    states: {
            phoneNumberVerification: {
            NEXT: "enterVerificationCode",
            NUMBER: 1,
            PREV: null,
            COMPONENT: InsertPhone,
            PROPS: {
                wrapper: {
                    title: "What's your phone number?",
                    subtitle: "We'll use your phone number to verify your account.",
                    viewProgressBar: false,
                },
                component: {},
            },
        },
        enterVerificationCode: {
            NEXT: "yourNameAndLastName",
            NUMBER: 2,
            PREV: "phoneNumberVerification",
            COMPONENT: OnbVerification,
            PROPS: {
                wrapper: {
                    title: "Enter your verification code",
                    subtitle: "We sent a code to your phone.",
                },
                component: {},
            },
        },
        yourNameAndLastName: {
            NEXT: "yourBirthDate",
            PREV: "enterVerificationCode",
            NUMBER: 3,
            COMPONENT: InsertName,
            PROPS: {
                wrapper: {
                    title: "First things first, what's your name?",
                },
                component: {},
            },
        },
        yourBirthDate: {
            NEXT: "yourGender",
            PREV: "yourNameAndLastName",
            NUMBER: 4,
            COMPONENT: InsertBirth,
            PROPS: {
                wrapper: {
                    title: "What's your birth date?",
                    subtitle: "we'll use your birth date to verify your age.",
                },
                component: {},
            },
        },
        yourGender: {
            NEXT: "yourSexuality",
            NUMBER: 5,
            PREV: "yourBirthDate",
            COMPONENT: InsertGender,
            PROPS: {
                wrapper: {
                    title: "Which gender best describes you?",
                    subtitle:
                        "We recognize that gender is fluid and personal. Choose what best represents you today.",
                },
                component: {},
            },
        },
        yourSexuality: {
            NEXT: "yourVibes",
            NUMBER: 6,
            PREV: "yourGender",
            COMPONENT: InsertSex,
            PROPS: {
                wrapper: {
                    title: "Select your sexuality",
                    subtitle:
                        "Sexuality can be complex, evolving, and beautifully unique. Choose what resonates with you in this moment.",
                },
                component: {},
            },
        },
            yourVibes: {
            NEXT: "yourCoreValues",
            NUMBER: 7,
            PREV: "yourSexuality",
            COMPONENT: ChooseMany,
            PROPS: {
                wrapper: {
                    title: "What's your vibe?",
                    subtitle: "Your vibe attracts your tribe. What's yours today?",
                },
                component: {
                    options: vibes,
                    headers: {
                        counter: "Select 3 vibes",
                        subtitle: "Your vibe attracts your tribe. What's yours today?",
                        title: "What's your vibe?",
                    },
                },
            },
        },
            yourCoreValues: {
                NEXT: "yourTypeConnections",
            NUMBER: 8,
            PREV: "yourVibes",
            COMPONENT: ChooseMany,
            PROPS: {
                wrapper: {
                    title: "What matters the most to you?",
                    subtitle:
                        "Your values guide your connections. Pick the ones that feel most like you.",
                },
                component: {
                    options: vibes,
                    headers: {
                        counter: "Select 3 core values",
                        subtitle:
                            "Your values guide your connections. Pick the ones that feel most like you.",
                        title: "What matters the most to you?",
                    },
                },
            },
            },
            yourTypeConnections: {
                NEXT: "yourTypeEvents",
                NUMBER: 9,
                PREV: "yourCoreValues",
                COMPONENT: ChooseMany,
                PROPS: {
                    wrapper: {
                        title: "Who are you secretly hoping to meet?",
                        subtitle:
                            "What kind of connections are you looking for on the unite platform?",
                    },
                    component: {
                        options: vibes,
                        headers: {
                            counter: "Select 2 types of connections",
                            subtitle:
                                "What kind of connections are you looking for on the unite platform?",
                            title: "Who are you secretly hoping to meet?",
                        },
                    },
                },
            },
            yourTypeEvents: {
                NEXT: "yourProfilePhotos",
                NUMBER: 10,
                PREV: "yourTypeConnections",
                COMPONENT: ChooseMany,
                PROPS: {
                    wrapper: {
                        title: "What type of events do you like?",
                        subtitle:
                            "Your scene. Your people. Find where the sparks happen.",
                    },
                    component: {
                        options: vibes,
                        headers: {
                            counter: "Select 3 types of events ",
                            subtitle:
                                "Your scene. Your people. Find where the sparks happen.",
                            title: "What type of events do you like?",
                        },
                    },
                },
            },
            yourProfilePhotos: {
            NEXT: "shareWithFriends",
                NUMBER: 11,
                PREV: "yourTypeEvents",
            COMPONENT: InsertGallery,
            PROPS: {
                wrapper: {
                    title: "Add your best photos",
                    subtitle: "Show your vibe with a few photos.",
                },
                component: {},
            },
        },
        shareWithFriends: {
            NEXT: "splash",
            NUMBER: 12,
            PREV: "yourProfilePhotos",
            COMPONENT: ShareComponent,
            PROPS: {
                wrapper: {
                    title: "Share with friends",
                    subtitle: "Invite your friends to join you on Unite.",
                },
                component: {},
            },
        },
        splash: {
            NEXT: "splash",
            NUMBER: 13,
            PREV: null,
            COMPONENT: Index,
            PROPS: { wrapper: { viewProgressBar: false }, component: {} },
        },
    },
};
