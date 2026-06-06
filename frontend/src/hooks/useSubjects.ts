import { useQuery } from "@tanstack/react-query";
import { type Subject } from "../schemas/subject.schema";
import { useAuth } from "@clerk/react";
import { getSubjects } from "../api/subject";

export function useSubjects() {
  const { getToken } = useAuth();

  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const token = await getToken();
      return getSubjects(token as string);
    },
  });
}
