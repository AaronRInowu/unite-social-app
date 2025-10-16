import FullNameModal from "@/components/Modals/Story/FullNameModal";
import ListModal from "@/components/Modals/Story/ListModal";
import LocationNameModal from "@/components/Modals/Story/LocationModal";
import { useVibes } from "@/hooks/useLists.hook";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import StoryFieldComponent from "../../Containers/StoryComponent/StoryFieldComponent";

type CustomFields = {
  type: string;
  value: string | string[];
  deg?: number;
  modal?: string;
  onValidChange?: (value: boolean) => void;
  registerSubmit?: (fn: () => void) => void;
};

export default function InsertStory() {
  const [isOpenFullNameModal, setIsOpenFullNameModal] = useState(false);
  const [isOpenLocationModal, setIsOpenLocationModal] = useState(false);
  const [isOpenListModal, setIsOpenListModal] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(0);

  const returnVibes = () => {
    const array = ["flirty 🔥", "playful 😉"].slice(0, 2);
    let vibes = [];
    for (let i = 0; i < array.length; i++) {
      if (i == 1) {
        vibes.push({ type: "text", value: " and " });
      }
      vibes.push({
        type: "chip",
        value: array[i],
        deg: i == 0 ? -3 : 0,
        modal: "vibes",
      });
    }
    return vibes;
  };

  const returnValues = () => {
    const array = ["love 💌", "honesty 🤝"].slice(0, 2);
    let vibes = [];
    for (let i = 0; i < array.length; i++) {
      if (i == 1) {
        vibes.push({ type: "text", value: " and " });
      }
      vibes.push({
        type: "chip",
        value: array[i],
        deg: i == 1 ? -3 : 0,
        modal: "values",
      });
    }
    return vibes;
  };

  const returnEvents = () => {
    const array = ["parades 🎉", "pride 🌈"].slice(0, 2);
    let vibes = [];
    for (let i = 0; i < array.length; i++) {
      if (i == 1) {
        vibes.push({ type: "text", value: " and " });
      }
      vibes.push({
        type: "chip",
        value: array[i],
        deg: i == 1 ? -3 : 0,
        modal: "events",
      });
    }
    return vibes;
  };

  const [fields, setFields] = useState<CustomFields[]>([
    { type: "text", value: "My name is " },
    { type: "chip", value: "Kevin 🙋‍♂️", deg: -3, modal: "fullname" },
    { type: "text", value: ". I live in " },
    { type: "chip", value: "Los Angeles, CA 🏡", deg: 3, modal: "location" },
    { type: "text", value: " bringing " },
    ...returnVibes(),
    { type: "text", value: " vibes." },
    { type: "text", value: " I value" },
    ...returnValues(),
    { type: "text", value: "— here to meet" },
    { type: "chip", value: "casual 🫦", deg: 0, modal: "connection" },
    { type: "text", value: "connections, and vibe at" },
    ...returnEvents(),
  ]);

  const vibes = useVibes();
  console.log("vibes", vibes);
  const callList = async (type: string) => {
    try {
      //  const list = await retrieveGeneral("/")
      switch (type) {
        case "vibes":
          console.log(1);

          // const vibes = [
          //   "Adventurous  🗺️",
          //   "Soulful 🌌",
          //   "Chill 😌",
          //   "Adventurous  🗺️",
          //   "Soulful 🌌",
          //   "Chill 😌",
          //   "Adventurous  🗺️",
          //   "Soulful 🌌",
          //   "Chill 😌",
          //   "Adventurous  🗺️",
          //   "Soulful 🌌",
          //   "Chill 😌",
          // ];
          // setValues(vibes);
          break;
        case "values":
          const values = [
            "Main character 🎬",
            "Consent ✋",
            "Creativity 🎨",
            "Ambition 🚀",
            "Acceptance 🤗",
            "Main character 🎬",
            "Consent ✋",
            "Creativity 🎨",
            "Ambition 🚀",
            "Acceptance 🤗",
          ];
          setValues(values);
          break;
        case "connection":
          const connection = [
            "Long-term 🧬",
            "Romantic 💋",
            "Casual 🫦",
            "Micro Romance ⌛",
            "Long-term 🧬",
            "Romantic 💋",
            "Casual 🫦",
            "Micro Romance ⌛",
          ];

          setValues(connection);
          break;
        case "events":
          const events = [
            "Activist 🪧",
            "Brunch 🥞",
            "Clubbing 🪩",
            "Collector Nights 🖼️",
            "Firelight Nights 🔥 ",
            "Activist 🪧",
            "Brunch 🥞",
            "Clubbing 🪩",
            "Collector Nights 🖼️",
            "Firelight Nights 🔥 ",
          ];

          setValues(events);
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  return (
    <View style={{ flexGrow: 1 }} className="flex flex-col gap-[20px]">
      <View className="flex-row gap-[10px] items-center">
        <Text className="text-[#FFF6A3] font-satoshi-bold text-[16px] py-5">
          Tap each
        </Text>
        <View className="bg-white p-2 rounded-[8px] rotate-[-3deg]">
          <Text className="text-[16px] font-satoshi-bold">white box</Text>
        </View>
        <Text className="text-[#FFF6A3] font-satoshi-bold text-[16px] py-5">
          to edit your story
        </Text>
      </View>

      <View className="flex-row gap-[10px] items-center flex-wrap">
        {fields.map((x: CustomFields, i: number) => {
          return x.type == "text" ? (
            <Text
              className="font-satoshi-bold text-[16px] text-main"
              key={"field" + i}
            >
              {x.value}
            </Text>
          ) : (
            <TouchableOpacity
              key={"field" + i}
              onPress={() => {
                setPosition(i);
                switch (x.modal) {
                  case "fullname":
                    setIsOpenFullNameModal(true);
                    break;
                  case "location":
                    setIsOpenLocationModal(true);
                    break;
                  case "vibes":
                    callList("vibes");
                    setTitle("Your vibe");
                    setIsOpenListModal(true);
                    break;
                  case "values":
                    callList("values");
                    setTitle("Your core values");
                    setIsOpenListModal(true);
                    break;
                  case "connection":
                    callList("connection");
                    setTitle("Type of connection");
                    setIsOpenListModal(true);
                    break;
                  case "events":
                    callList("events");
                    setTitle("Type of events");
                    setIsOpenListModal(true);
                    break;
                  default:
                    break;
                }
              }}
            >
              <StoryFieldComponent value={x.value} deg={x.deg ?? 0} />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Full name modal  */}
      <FullNameModal
        open={isOpenFullNameModal}
        close={() => {
          setIsOpenFullNameModal(false);
        }}
        value={(x) => {
          fields[1].value = x;
          setFields([...fields]);
        }}
      />
      {/* location modal  */}
      <LocationNameModal
        open={isOpenLocationModal}
        close={() => {
          setIsOpenLocationModal(false);
        }}
        value={(x) => {
          fields[3].value = x;
          setFields([...fields]);
        }}
      />
      <ListModal
        open={isOpenListModal}
        close={() => {
          setIsOpenListModal(false);
        }}
        value={(x) => {
          console.log(x);
          fields[position].value = x;
          setFields([...fields]);
        }}
        list={values}
        title={title}
      />
    </View>
  );
}
