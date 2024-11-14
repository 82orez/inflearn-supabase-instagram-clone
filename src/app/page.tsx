import Image from "next/image";
import Logout from "@/components/auth-page/logout";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div>Home</div>
      <div>Welcome </div>
      <div>Welcome </div>
      <div>Welcome </div>
      <Logout />
    </main>
  );
}
