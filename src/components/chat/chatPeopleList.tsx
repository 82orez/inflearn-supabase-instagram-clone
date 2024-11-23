"use client";

import Person from "@/components/chat/person";
import { useRecoilValue } from "recoil";
import { selectedIndexState } from "@/app/atoms/selectedIndexState";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
// import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { getTodo } from "@/server-actions/actions";

export default function ChatPeopleList() {
  const selectedIndex = useRecoilValue(selectedIndexState);
  const { isPending, data, error } = useQuery({
    queryKey: ["getChatPeopleListQuery"],
    // queryFn: async () => {
    //   const res = await axios("/api/people-list");
    //   return await res.data;
    // },
    // queryFn: async () => {
    //   const prisma = new PrismaClient();
    //   const lists = await prisma.userinfo.findMany({});
    //   return lists;
    // },
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("userinfo").select("*");
      if (error) {
        console.error("Error checking user info:", error);
      }
      return data;
    },
  });

  const getToDoQuery = useQuery({
    queryKey: ["getTodo"],
    queryFn: () => getTodo(),
  });

  // @ts-ignore
  if (isPending) return <Spinner />;
  if (error) {
    console.log(error.message);
    return <p>Error loading Lists</p>;
  }
  // @ts-ignore
  if (getToDoQuery.isPending) return <Spinner />;
  if (getToDoQuery.error) {
    console.log(getToDoQuery.error.message);
    return <p>Error loading Todos</p>;
  }

  return (
    <div className={"h-screen bg-gray-100"}>
      <Person
        index={0}
        userId={"a"}
        name={"TG"}
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 0}
        onChatScreen={false}
        // onClick={() => setSelectedIndex(0)}
      />
      <Person
        index={1}
        userId={"a"}
        name={"TG"}
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 1}
        onChatScreen={false}
        // onClick={() => setSelectedIndex(1)}
      />
      {data?.map((people) => (
        <div key={people.id}>
          <img src={people.user_metadata.avatar_url} alt="" className={"p-2 rounded-full w-20 h-20"} />
          <div>{people.user_metadata.user_name}</div>
        </div>
      ))}
      {getToDoQuery.data?.map((todo) => <div key={todo.id}>{todo.title}</div>)}
    </div>
  );
}
