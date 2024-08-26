import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/useAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the new user's email address."
      );
    },
  });
  return { signup, isLoading };
}
