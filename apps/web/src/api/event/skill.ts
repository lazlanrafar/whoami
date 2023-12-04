import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const baseUrl = "/skill";

export const useGetSkillQuery = () => {
  return useQuery({
    queryKey: ["skill"],
    queryFn: () => {
      return axiosInstance.get(baseUrl);
    },
  });
};
