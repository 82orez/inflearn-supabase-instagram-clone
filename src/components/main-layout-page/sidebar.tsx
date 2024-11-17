"use client";

import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Sidebar() {
  const supabase = createClient();
  return (
    <aside className={"border-4 h-screen w-1/3 max-w-[240px] min-w-[120px] p-6 flex flex-col justify-center items-center"}>
      <Link href="/goodjob">
        <HomeIcon className={"text-5xl"} />
      </Link>
      <Link href={"/"}>
        <PeopleAltIcon className={"text-5xl"} />
      </Link>
      <Link href={"/"}>
        <SearchIcon className={"text-5xl"} />
      </Link>
      <Link href={"/"} className={"flex flex-col justify-center items-center"}>
        <SendIcon className={"text-5xl text-blue-800"} />
        <div>메세지 보내기</div>
      </Link>
      <div
        onClick={() => {
          supabase.auth.signOut();
          return;
        }}>
        <ExitToAppIcon className={"text-5xl bg-amber-300"} />
        <div>Log out</div>
      </div>
    </aside>
  );
}
