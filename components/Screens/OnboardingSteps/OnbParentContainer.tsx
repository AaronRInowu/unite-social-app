import { gradientColors } from "@/global/styles/tailwindClasses";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft2 } from 'iconsax-react-nativejs';
import { Text, TouchableOpacity, View } from "react-native";


export default function OnbParentContainer({
    children,
    title,
    subtitle,
    handleSteps,
    onboardingStep,
    totalSteps,
    viewProgressBar = true,
}: {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    handleSteps: (type: "rest" | "add") => Promise<void>;
    onboardingStep: number;
    totalSteps: number;
    viewProgressBar?: boolean;
}) {
    return (
        <View className="flex-1 pt-12" style={{ gap: 32 }}>
            {viewProgressBar && (
                <View
                    style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => handleSteps("rest")}>
                        <Text className="text-main text-xl-custom">
                            <ArrowLeft2 size="20" color="#ffffffff" />
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderRadius: 12,
                            width: "70%",
                            backgroundColor: "#ffffff10",
                            height: 9,
                            marginInline: "auto",
                        }}
                    >
                        <LinearGradient
                            colors={gradientColors.button}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                width: `${(onboardingStep / totalSteps) * 100}%`,
                                height: "100%",
                                ...(onboardingStep === totalSteps
                                    ? { borderRadius: 12 }
                                    : { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }),
                            }}
                        />
                    </View>
                </View>
            )}
            <View style={{ gap: 12, paddingBottom: 56 }}>
                <Text className="text-main text-lg-custom font-satoshi-bold">
                    {title}
                </Text>
                { subtitle && <Text className="text-main">{subtitle}</Text>}
                {children}
            </View>
        </View>
    );
}
