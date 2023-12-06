import axiosInstance from "..";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISkill } from "@/types";
import { toast } from "sonner";

const baseUrl = "/skill";

export const useGetSkillQuery = () => {
  return useQuery({
    queryKey: ["skill"],
    queryFn: () => {
      return axiosInstance.get(baseUrl);
    },
    refetchOnMount: false,
  });
};

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISkill) => {
      return axiosInstance.post(baseUrl, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["skill"] as any);

      toast.success("Skill created successfully");
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
