import { create } from 'zustand'

export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  messages: string;
  users: {
    id: string;
    email: string | null;         // Allow email to be null
    avatar_url: string | null;    // Allow avatar_url to be null
    display_name: string | null;  // Allow display_name to be null
  } | null;                       // Allow the entire users object to be null
};

interface MessageState {
  messages :Imessage[]

  addMessage:(message:Imessage)=>void;
}

const useMessage = create<MessageState>()((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

}))

export default useMessage;