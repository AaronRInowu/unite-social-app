import { colors } from "@/global/styles/tailwindClasses";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";
import IonIcons from "react-native-vector-icons/Ionicons";
import { RadialView } from "../Displays/RadialView";
import GradientButton from "../Inputs/GradientButton";

export const NavigationBar = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const isApple = Platform.OS === "ios";

  const modalRedirections = [
    { href: "", name: "New event" },
    { href: "", name: "Update story" },
  ];
  const redirections: {
    name: string;
    href?: string;
    icon?: React.ReactElement;
    style?: StyleProp<ViewStyle>;
  }[] = [
    {
      name: "Connect",
      href: "conections",
      icon: (
        <View style={{ alignItems: "center" }}>
          <View
            className="bg-neutral-500 rounded-full"
            style={{
              width: 22,
              height: 2,
            }}
          />
          <IonIcons
            name="tablet-landscape-outline"
            size={24}
            color={"#737373"}
          />
          <View
            className="bg-neutral-500 rounded-full"
            style={{
              width: 22,
              height: 2,
            }}
          />
        </View>
      ),
      style: { borderTopLeftRadius: 24, paddingLeft: 16 },
    },
    {
      name: "Event",
      href: "event",
      icon: (
        <IonIcons name="calendar-clear-outline" size={28} color={"#737373"} />
      ),
      style: { borderTopRightRadius: 24, paddingRight: 16 },
    },
    {
      name: "",
      icon: <></>,
      style: {},
    },
    {
      name: "Chat",
      href: "chat",
      icon: (
        <IonIcons
          name="chatbubble-ellipses-outline"
          size={28}
          color={"#737373"}
        />
      ),
      style: { borderTopLeftRadius: 24, paddingLeft: 16 },
    },
    {
      name: "Profile",
      href: "profile",
      icon: (
        <View className="border-neutral-500 border-2 rounded-full bg-black w-[30px] aspect-square">
          {/* pfp */}
        </View>
      ),
      style: { borderTopRightRadius: 24, paddingRight: 16 },
    },
  ];

  const changeBlur = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 150);
  };

  return (
    <>
      <View
        onLayout={changeBlur}
        style={{
          marginInline: "auto",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row",
          borderRadius: 24,
        }}
      >
        {redirections.map((m, i) => {
          const { style } = m;
          const isSelected = selectedTab !== "" && m.name === selectedTab;
          const getStyles = (style ?? {}) as Record<string, string | number>;
          const { paddingLeft, paddingRight, ...rest } = getStyles;
          const width = "100%";
          const height = 110;
          const radius = "48";
          // bg-[#1D1F3CCC]
          return m.href ? (
            <View
              key={"navbar_" + i}
              className={`justify-center items-center bg-[#1D1F3CCC] overflow-hidden`}
              style={{
                flex: 1,
                ...rest,
              }}
            >
              <BlurView
                className="w-full h-full  overflow-hidden justify-center"
                style={{
                  ...getStyles,
                }}
                intensity={isLoaded ? 5 : 0}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setSelectedTab(m.name)}
                >
                  <View className="items-center gap-2 justify-center">
                    {m.icon && isSelected ? (
                      <MaskedView
                        maskElement={m.icon}
                        className="border broder-white"
                      >
                        <GradientButton
                          style={{ padding: 0, width: 30, height: 30 }}
                        />
                      </MaskedView>
                    ) : (
                      m.icon
                    )}

                    {isSelected && (
                      <RadialView
                        style={{
                          position: "absolute",
                          top: 0,
                        }}
                        start={{ opacity: "0" }}
                        end={{ opacity: ".2" }}
                        width={"60%"}
                        height={"60%"}
                      />
                    )}
                    <Text
                      className={`${!isSelected ? "text-neutral-500" : "text-white"}`}
                    >
                      {m.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </BlurView>
            </View>
          ) : (
            <View
              key={"navbar_" + i}
              className="relative"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BlurView
                className="bg-white w-full h-[59%] absolute bottom-0 left-0"
                intensity={isLoaded ? 5 : 0}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
              />
              <BlurView
                className="bg-white w-full h-[14%] absolute bottom-[59%] left-0"
                intensity={isLoaded ? 3 : 0}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
              />
              <BlurView
                className="bg-white w-full h-[7%] absolute bottom-[73%] opacity-60 left-0"
                intensity={isLoaded ? 3 : 0}
                tint="dark"
                experimentalBlurMethod="dimezisBlurView"
              />
              <Svg width={width} height={height}>
                <Defs>
                  <ClipPath id="cutout">
                    {/* Use a path to draw a rectangle with a cut-out circle at the top center */}
                    <Path
                      d={`
                        M0,0 
                        H100
                        V110 
                        H0 
                        Z
                        M44,-2
                        m-${radius},0 
                        a${radius},${radius} 0 1,0 ${parseFloat(radius) * 2},0 
                        a${radius},${radius} 0 1,0 -${parseFloat(radius) * 2},0
                      `}
                      fillRule="evenodd"
                    />
                  </ClipPath>
                </Defs>

                <Rect
                  x="0"
                  y="0"
                  width={width}
                  height={height}
                  fill="#1D1F3C"
                  opacity={Platform.OS === "ios" ? 0.8 : 0.533}
                  clipPath="url(#cutout)"
                />
              </Svg>
            </View>
          );
        })}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            position: "absolute",
            left: "50%",
            top: "-42%",
            transform: [{ translateX: "-50%" }, { translateY: "30%" }],
            backgroundColor: colors.gradientEnd,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setOpenModal((prev) => !prev)}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonIcons name="add" size={24} color={"#cacaca"} />
            <RadialView style={{ position: "absolute" }} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          activeOpacity={1}
          className="relative w-full h-full"
          onPress={() => setOpenModal(false)}
        >
          <View
            className={`w-[300px] rounded-2xl overflow-hidden left-[50%] -translate-x-[50%] ${isApple ? "bottom-[160px]" : "bottom-[120px]"} absolute`}
          >
            {modalRedirections.map((m, i) => {
              return (
                <BlurView
                  key={"popup_" + i}
                  intensity={isLoaded ? 1 : 0}
                  tint="dark"
                  experimentalBlurMethod="dimezisBlurView"
                >
                  <Link
                    href={"/"}
                    onPress={() => setOpenModal(false)}
                    className={`border-b text-center py-4 text-white ${i !== modalRedirections.length - 1 ? "border-b-neutral-500" : "border-b-transparent"} bg-[#1D1F3CAA]`}
                  >
                    {m.name}
                  </Link>
                </BlurView>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
