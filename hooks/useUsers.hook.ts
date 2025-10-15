import { User } from '@/global/interfaces/users.interface';
import { createGraphQLClient, fetcher } from '@/services/graphql/graph.client';
import { GET_POSTS_QUERY } from '@/services/graphql/queries/getAllUsers.query';
import { retrieveGeneral } from '@/services/restapi/general.axios';
import { updateUser } from '@/services/restapi/users/users.axios';
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';

// Hook para obtener usuarios
export const useUsers = () => {
  const client = createGraphQLClient(`${process.env.EXPO_PUBLIC_API_URL!}/graphql`);
  console.log("GraphQL Client created with endpoint:", `${process.env.EXPO_PUBLIC_API_URL!}/graphql`);
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetcher<{ Users: { docs: Partial<User>[] } }>(client)(GET_POSTS_QUERY), // Cambia el ID según sea necesario
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un usuario específico
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => retrieveGeneral(`/users/${userId}`),
    enabled: !!userId, // Solo ejecutar si userId existe
  });
};

// Hook para mutaciones (crear, actualizar, eliminar)
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: any) => retrieveGeneral('/users'), // Cambiar por tu endpoint POST
    onSuccess: () => {
      // Invalidar y refrescar la cache de usuarios
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};


export const useUpdateUser = (
  options?: UseMutationOptions<any, Error, Partial<User>>
) => {
  console.log("useUpdateUser hook called");
  const mutationKey = ['updateUser'];
  const mutationFn = async (params: Partial<User>) => {
    console.log("Calling update user endpoint with params:", params);
   const data = await updateUser(params);
    return data;
  };

  return useMutation<any, Error, Partial<User>>({
    mutationFn,
    mutationKey,  
    ...options,
  });
}