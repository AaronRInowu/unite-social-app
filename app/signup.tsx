import PageLayout from "@/components/layout/appBg";
import { Text, View } from "react-native";
import { useUsers } from "../hooks/useUsers";

export default function TestOnbording() {
  const { data: users, isLoading, error, isError } = useUsers();

  return (
    <PageLayout>
      <View>
        <Text className="text-main text-lg-custom">
          Choose user to finish onboarding
        </Text>
        
        {isLoading && (
          <Text className="text-main">
            Cargando usuarios...
          </Text>
        )}
        
        {isError && (
          <Text className="text-main">
            Error: {error?.message || 'Error al cargar usuarios'}
          </Text>
        )}
        
        {users && (
          <Text className="text-main">
            Usuarios cargados exitosamente
            {
              users.data.map((user: any) => (
                <Text key={user.id} className="text-main">
                  {user.name} - {user.email}
                </Text>
              ))
            }
          </Text>
        )}
      </View>
    </PageLayout>
  );
}
