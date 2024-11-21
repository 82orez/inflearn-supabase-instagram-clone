"use server";

import Image from "next/image";
import Logout from "@/components/auth-page/logout";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Logged in User information: ", user);
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div>Home</div>
      <div>Welcome {user?.user_metadata.user_name} 님!</div>
      <img src={user?.user_metadata.avatar_url} alt={user?.user_metadata.user_name} className={"rounded-full"} />
      <div>{user?.app_metadata.provider} 로그인 완료</div>
      <Logout />
    </main>
  );
}
