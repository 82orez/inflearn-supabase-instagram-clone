"use client";

import Person from "@/components/chat/person";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedIndexState } from "@/app/atoms/selectedIndexState";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";

export default function ChatPeopleList() {
  const selectedIndex = useRecoilValue(selectedIndexState);
  const { isPending, data, error } = useQuery({
    queryKey: ["getChatPeopleListQuery"],
    queryFn: async () => {
      const res = await axios("/api/peoplelist");
      const result = await res.data;
      return result;
    },
  });

  // @ts-ignore
  if (isPending) return <Spinner />;
  if (error) {
    console.log(error.message);
    return <p>Error loading notes</p>;
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
      {data.map((people) => (
        <div key={people.id}>
          <img src={people.user_metadata.avatar_url} alt="" className={"p-2 rounded-full w-20 h-20"} />
          <div>{people.user_metadata.user_name}</div>
        </div>
      ))}
    </div>
  );
}
