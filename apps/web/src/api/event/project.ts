import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";
import { IProject } from "@/types";
import { toast } from "sonner";

const baseUrl = "/project";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProject) => {
      return axiosInstance.post(baseUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project"] as any);

      toast.success("Project created successfully");
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
