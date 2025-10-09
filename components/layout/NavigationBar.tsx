import { bgGradient2, btnGradient1 } from "@/globals/styles/colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Svg, { RadialGradient, Rect, Stop } from "react-native-svg";
import IonIcons from "react-native-vector-icons/Ionicons";

export const NavigationBar = () => {
  const [selectedTab, setSelectedTab] = useState("");
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
            style={{
              backgroundColor: "#ffffff40",
              width: 22,
              height: 2,
              borderRadius: 100,
            }}
          />
          <IonIcons
            name="tablet-landscape-outline"
            size={24}
            color={"#ffffff40"}
          />
          <View
            style={{
              backgroundColor: "#ffffff40",
              width: 22,
              height: 2,
              borderRadius: 100,
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
        <IonIcons name="calendar-clear-outline" size={28} color={"#ffffff40"} />
      ),
      style: { borderTopRightRadius: 28, paddingRight: 16 },
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
          color={"#ffffff40"}
        />
      ),
      style: { borderTopLeftRadius: 28, paddingLeft: 16 },
    },
    {
      name: "Profile",
      href: "profile",
      icon: (
        <View
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#000",
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#ffffff40",
          }}
        ></View>
      ),
      style: { borderTopRightRadius: 24, paddingRight: 16 },
    },
  ];
  return (
    <View
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
      {redirections.map(({ style, ...m }, i) => {
        const getStyles = (style ?? {}) as object;
        return (
          <View
            key={"navbar_" + i}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1D1F3CCC",
              ...getStyles,
            }}
          >
            {m.href && (
              <Link href={"/"}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {m.icon && m.icon}
                  {/* <Image
                    //   source={require("../../assets/thumbs.jpg")}
                    alt="No hay icon"
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: "#ffffff0a",
                    }}
                  /> */}
                  <Text
                    style={{
                      color: "#FFFFFF4D",
                    }}
                  >
                    {m.name}
                  </Text>
                </View>
              </Link>
            )}
          </View>
        );
      })}
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          position: "absolute",
          left: "50%",
          top: "-55%",
          transform: [{ translateX: "-50%" }, { translateY: "30%" }],
          backgroundColor: bgGradient2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
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
          <Svg
            style={{
              position: "absolute",
            }}
            height="100%"
            width="100%"
          >
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
            >
              <Stop offset="100%" stopColor={"#24124BCC"} stopOpacity=".3" />
              <Stop
                offset="0%"
                stopColor={`${btnGradient1}00`}
                stopOpacity=".2"
              />
            </RadialGradient>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
          </Svg>
        </View>
      </View>
    </View>
  );
};
