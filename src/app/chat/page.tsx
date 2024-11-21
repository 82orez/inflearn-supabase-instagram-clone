import Person from "@/components/auth-page/chat/person";

export default function ChatPage() {
  return (
    <main className={"border-2 bg-gray-50 flex justify-center items-center w-full"}>
      <Person index={0} userId={"a"} name={"TG"} onlineAt={new Date().toISOString()} isActive={false} onChatScreen={false} onClick={null} />
    </main>
  );
}
