import { createGraphQLClient, fetcher } from "@/services/graphql/graph.client";
import { GET_VIBES } from "@/services/graphql/queries/getAllVibes.query";
import { useQuery } from "@tanstack/react-query";

export const useVibes = () => {
  const client = createGraphQLClient(
    `${process.env.EXPO_PUBLIC_API_URL!}/vibes`,
    {}
  );

  return useQuery({
    queryKey: ["vibes"],
    queryFn: () => fetcher(client)(GET_VIBES),
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
};
