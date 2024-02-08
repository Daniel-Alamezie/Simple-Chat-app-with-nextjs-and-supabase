import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import MessageList from "@/components/message-list";
import InitUser from "@/lib/store/initUser";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = supabaseServer()
  const { data } = await supabase.auth.getSession()
  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">

        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={data.session?.user} />
          <ChatMessages />
          <div className="p-5">
            <ChatInput/>
          </div>

        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
