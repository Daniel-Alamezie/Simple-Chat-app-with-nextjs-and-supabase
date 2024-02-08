'use client'
import { supabaseBrowser } from "@/lib/supabase/browser"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import useUser from "@/lib/store/store";
import useMessage, { Imessage } from "@/lib/store/messages";


export default function ChatInput() {
  const supabase = supabaseBrowser()
  const user = useUser((state) => state.user)
  const addMessage = useMessage((state) => state.addMessage)

  const handleSendMessage = async (messages: string) => {

    if (messages!=''){

      // Construct the message object with temporary values
      const tempMessage: Imessage = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        is_edit: false,
        send_by: user?.id || '', // Replace with actual sender ID
        messages: messages,
        users: {
          id: user?.id || '', // Replace with actual user ID
          email: user?.email || null, // Include the email or null if not available
          avatar_url: user?.user_metadata.avatar_url || null, // Include the avatar_url or null if not available
          display_name: user?.user_metadata.display_name || null, // Include the display_name or null if not available
        },
      };
  
      // Optimistically add the message to the UI
      addMessage(tempMessage);
  
      // Attempt to insert the message into the database
      const { data, error } = await supabase.from("messages").insert({
        messages: tempMessage.messages,
        send_by: tempMessage.send_by,
        is_edit: tempMessage.is_edit
        // Other necessary properties
      });
  
      if (error) {
        // If the insert fails, remove the message from the UI and show an error
        toast.error("Oops, error sending message!");
      }
    }
    else{
      toast.message("Message Cannot be empty")
    }
  };
  return (
    <Input placeholder="Say hello 👋" onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSendMessage(e.currentTarget.value)
        e.currentTarget.value = ""
      }

    }} />
  )
}
