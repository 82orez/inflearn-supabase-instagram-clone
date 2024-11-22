import ChatPeopleList from "@/components/chat/chatPeopleList";
import ChatScreen from "@/components/chat/chatScreen";

export default function ChatPage() {
  return (
    <main className={"border-2 bg-gray-50 flex justify-center items-center w-full"}>
      <ChatPeopleList />
      <ChatScreen />
    </main>
  );
}
