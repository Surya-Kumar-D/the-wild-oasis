import { useMutation, useQueryClient } from "@tanstack/react-query";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => Logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading, error };
}
