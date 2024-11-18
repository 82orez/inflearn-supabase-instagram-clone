import Image from "next/image";
import Logout from "@/components/auth-page/logout";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div>Home</div>
      <div>Welcome {user?.user_metadata.name} 님!</div>
      <img src={user?.user_metadata.avatar_url} alt={user?.user_metadata.name} className={"rounded-full"} />
      <Logout />
    </main>
  );
}
