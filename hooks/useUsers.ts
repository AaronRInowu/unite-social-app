import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { retrieveGeneral } from '../services/general.axios';

// Hook para obtener usuarios
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => retrieveGeneral('/users'),
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