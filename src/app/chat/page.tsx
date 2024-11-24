"use server";

import ChatPeopleList from "@/components/chat/chatPeopleList";
import ChatScreen from "@/components/chat/chatScreen";
import { createClient } from "@/utils/supabase/server";

export default async function ChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user: ", user);

  return (
    <main className={"border-2 bg-gray-50 flex justify-center items-center w-full"}>
      <ChatPeopleList loggedInUserId={user?.id} />
      <ChatScreen />
    </main>
  );
}
