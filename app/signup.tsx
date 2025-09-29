import PageLayout from "@/components/layout/appBg";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import globalStyles from "../globals/styles/globalStyles";
import { retrieveGeneral } from "../services/general.axios";

export default function TestOnbording() {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    if (loader) {
      try {
        const res = await retrieveGeneral("/users");
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    }
  }, [loader]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <PageLayout>
      <View>
        <Text style={{ ...globalStyles.mainTextColor, ...globalStyles.textLg }}>
          Choose user to finish onboarding
        </Text>
      </View>
    </PageLayout>
  );
}
