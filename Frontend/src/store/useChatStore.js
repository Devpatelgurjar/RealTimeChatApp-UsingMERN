import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => {
  return {
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
      set({ isUserLoading: true });
      try {
        const res = await axiosInstance.get("/message/users");
        set({ users: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isUserLoading: false });
      }
    },

    getMessages: async (id) => {
      set({ isMessageLoading: true });
      try {
        const res = await axiosInstance.get(`/message/${id}`);
        set({ messages: res.data });
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isMessageLoading: false });
      }
    },
    sendMessage: async (messageData) => {
      const { selectedUser, messages } = get();

      try {
        const res = await axiosInstance.post(
          `/message/send/${selectedUser._id}`,
          messageData
        );
        set({ messages: [...messages, res.data] });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    deleteMessage: async (messageId) => {
      const { messages } = get();
      try {
        const res = await axiosInstance.delete(`/message/delete`, {
          data: { messageId },
        });
        console.log(res);
        set((state) => ({
          messages: state.messages.filter(
            (message) => message.id !== messageId
          ),
        }));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },

    subscribeToMessages: () => {
      const { selectedUser } = get();
      if (!selectedUser) return;

      const sockat = useAuthStore.getState().socket;

      sockat.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser =
          newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        set({
          messages: [...get().messages, newMessage],
        });
      });
    },

    unsubscribeFromMessages: () => {
      const socket = useAuthStore.getState().socket;
      socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
  };
});
