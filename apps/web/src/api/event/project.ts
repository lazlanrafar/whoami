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

export const useGetProjectByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => {
      return axiosInstance.get(baseUrl + "/" + id);
    },
    refetchOnMount: false,
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

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProjectForm) => {
      return axiosInstance.put(baseUrl + "/" + data.id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project"] as any);

      toast.success("Project updated successfully");
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => {
      return axiosInstance.delete(baseUrl + "/" + projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["project"] as any);

      toast.success("Project deleted successfully");
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
