import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";
import { IProjectForm } from "@/types";
import { toast } from "sonner";

const baseUrl = "/project";

export const useGetProjectQuery = () => {
  return useQuery({
    queryKey: ["project"],
    queryFn: () => {
      return axiosInstance.get(baseUrl);
    },
  });
};

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProjectForm) => {
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
