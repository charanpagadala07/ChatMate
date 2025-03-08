import {create} from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isMessagesLoading:false,
    isUsersLoading:false,

    getUsers: async () => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data})
        } catch (error) {
            console.log("error in get users ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading:false})
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data})
        } catch (error) {
            console.log("error in get messages ", error)
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages:[...messages, res.data]})
        } catch (error) {
            console.log("error in send message ", error)
            toast.error(error.response.data.message)
        }

    },

    subscribeToMessages: () => {
        const {selectedUser} = get()
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=>{
            const isMessagecomingfromtheSelectedUser = newMessage.sender._id === selectedUser._id;
            if(isMessagecomingfromtheSelectedUser) return;
            
            set({
                messages: [...get().messages, newMessage],
            })
        })
    },

    unsubscribeFromMessages: () =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (user) => {
        set({selectedUser:user})
    }
}))