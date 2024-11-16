import Image from "next/image";
import Logout from "@/components/auth-page/logout";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div>Home</div>
      <div>Welcome {session?.user.email} </div>
      <Logout />
    </main>
  );
}
