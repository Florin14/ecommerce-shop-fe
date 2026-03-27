import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, setAuthenticated, logout as logoutAction } from "../store";
import { useGetProfileQuery } from "../store/api/authApi";

export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const { data: user, isLoading } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
  });

  const loginSuccess = useCallback(
    (accessToken: string, refreshToken: string) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(setAuthenticated(true));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate("/login");
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === "ADMIN",
    loginSuccess,
    logout,
  };
}
