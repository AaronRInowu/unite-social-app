import { GalleryTips } from "@/components/Containers/GalleryTips/GalleryTips";
import AddImage from "@/components/Inputs/AddImage";
import SlideDownModal from "@/components/Modals/SlideDownModal";
import { ItempUserTry } from "@/global/interfaces/general.interface";
import {
  allEditUserOptions,
  editInterestOptions,
  editPersonOptions,
  editUserOptions,
  mapAllEditOptions,
  noEditUserAction,
} from "@/global/templates/user.template";
import { ArrowRight2, InfoCircle } from "iconsax-react-nativejs";
import React, { Fragment, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const EditProfile = ({ me }: ItempUserTry) => {
  const [options, setOptions] = useState("");
  const validOption = allEditUserOptions.includes(options);
  const selectedUser = me;
  const validPref =
    selectedUser?.userPreferences &&
    typeof selectedUser.userPreferences !== "number"
      ? selectedUser.userPreferences
      : undefined;

  const returnOptionValues = (op: string) => {
    switch (op) {
      case editUserOptions[0]:
        return {
          title: "Full name",
          subtitle: `${selectedUser?.firstName ?? ""} ${selectedUser?.lastName ?? ""}`,
        };
      case editUserOptions[1]:
        return {
          title: "Location",
          subtitle: "Location",
        };
      case editUserOptions[2]:
        return {
          title: "Date of birth",
          subtitle: selectedUser?.birthDate
            ? new Date(selectedUser.birthDate).toLocaleDateString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
        };
      case editUserOptions[3]:
        return {
          title: "Gender",
          modalTitle: "Gender Identity",
          subtitle:
            validPref?.gender && typeof validPref.gender !== "number"
              ? validPref.gender.title
              : "",
        };
      case editUserOptions[4]:
        return {
          title: "Sexuality",
          subtitle:
            validPref?.sexuality && typeof validPref.sexuality !== "number"
              ? validPref.sexuality.title
              : "",
        };
      case editInterestOptions[0]:
        return {
          title: "Types of events",
          subtitle:
            validPref?.events && typeof validPref.sexuality !== "number"
              ? validPref.events
                  .map((m) => (typeof m === "number" ? m : m.title))
                  .join(", ")
              : "",
        };
      case editInterestOptions[1]:
        return {
          title: "Preferences",
          modalTitle: "Type of connection",
          subtitle:
            validPref?.connectionTypes &&
            typeof validPref.connectionTypes !== "number"
              ? validPref.connectionTypes
                  .map((m) => (typeof m === "number" ? m : m.title))
                  .join(", ")
              : "",
        };
      case editPersonOptions[0]:
        return {
          title: "Your vibe",
          subtitle:
            validPref?.vibes && typeof validPref.vibes !== "number"
              ? validPref.vibes
                  .map((m) => (typeof m === "number" ? m : m.title))
                  .join(", ")
              : "",
        };
      case editPersonOptions[1]:
        return {
          modalTitle: "Your core values",
          title: "Core values",
          subtitle:
            validPref?.coreValues && typeof validPref.coreValues !== "number"
              ? validPref.coreValues
                  .map((m) => (typeof m === "number" ? m : m.title))
                  .join(", ")
              : "",
        };
      case "galleryinfo":
        return {
          title: "Photo upload tips",
          component: (
            <View className="pt-6 grow">
              <GalleryTips closeModal={closeModal} bgWhite />
            </View>
          ),
          // size:
        };
      default:
        return {
          title: "",
          subtitle: "",
        };
    }
  };
  const closeModal = () => {
    setOptions("");
  };

  return (
    <>
      <ScrollView contentContainerClassName="gap-6 pb-20">
        <Text className="text-unite-title text-white">Edit profile</Text>
        {mapAllEditOptions.map((edits, i) => {
          return (
            <Fragment key={"edit_" + i}>
              <Text className="text-lg text-white">{edits.title}</Text>
              <View className="gap-2 pb-4 border-b border-neutral-500">
                {edits.arr.map((m) => {
                  const hasAction = !noEditUserAction.includes(m);
                  return (
                    <TouchableOpacity
                      key={m}
                      onPress={() => (!hasAction ? {} : setOptions(m))}
                      activeOpacity={1}
                      className="flex-row justify-between px-5 py-3"
                    >
                      <View className="gap-1">
                        <Text className="text-2xl text-white">
                          {returnOptionValues(m).title}
                        </Text>
                        <Text className="text-neutral-500">
                          {returnOptionValues(m).subtitle}
                        </Text>
                      </View>
                      {hasAction && <ArrowRight2 color="#fff" size={20} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Fragment>
          );
        })}
        <View className="flex-row gap-3 justify-between">
          <Text className="text-lg text-white">My gallery</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setOptions("galleryinfo")}
          >
            <InfoCircle color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <View className="gap-3 flex-row">
          <AddImage />
          <AddImage />
          <AddImage />
        </View>
      </ScrollView>
      <SlideDownModal
        childrenContainerClass="!bg-white"
        title={
          returnOptionValues(options)?.modalTitle ??
          returnOptionValues(options)?.title
        }
        titleClass={"!text-black font-semibold"}
        visible={validOption}
        closeColor="#000"
        onRequestClose={closeModal}
      >
        {returnOptionValues(options)?.component}
      </SlideDownModal>
    </>
  );
};
