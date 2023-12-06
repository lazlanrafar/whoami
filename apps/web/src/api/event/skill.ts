import axiosInstance from "..";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ISkill } from "@/types";
import { toast } from "sonner";

const baseUrl = "/skill";

export const useGetSkillQuery = () => {
  return useQuery({
    queryKey: ["skill"],
    queryFn: () => {
      return axiosInstance.get(baseUrl);
    },
  });
};

export const useCreateSkillMutation = () => {
  return useMutation({
    onSuccess: () => {
      useGetSkillQuery().refetch();
    },
    mutationFn: (data: ISkill) => {
      return axiosInstance.post(baseUrl, data);
    },
  });
};
