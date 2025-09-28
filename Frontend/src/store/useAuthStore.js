import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => {
  return {
    authUser: null,
    isSingingUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/user/check");

        set({ authUser: res.data });
        get().connectSocket();
      } catch (error) {
        console.log(error);
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    singup: async (data) => {
      set({ isSingingUp: true });
      try {
        const res = await axiosInstance.post("/user/signup", data);
        set({ authUser: res.data });
        toast.success("Singup successfully");
        get().connectSocket();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        set({ isSingingUp: false });
      }
    },

    login: async (data) => {
      set({ isLoggingIn: true });
      try {
        const res = await axiosInstance.post("/user/login", data);
        set({ authUser: res.data });
        toast.success("Login successfully");
        get().connectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        await axiosInstance("/user/logout");
        set({ authUser: null });
        toast.success("Logout successfully");
        get().disconnectSocket();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/user/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
      } finally {
        set({ isUpdatingProfile: false });
      }
    },

    connectSocket: () => {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      socket.connect();

      set({ socket: socket });

      socket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
    },

    disconnectSocket: () => {
      if (get().socket?.connected) get().socket.disconnect();
    },
  };
});
