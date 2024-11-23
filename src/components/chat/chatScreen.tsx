"use client";

import Person from "@/components/chat/person";
import { Button } from "@material-tailwind/react";
import Message from "@/components/chat/message";
import { useRecoilValue } from "recoil";
import { selectedIndexState } from "@/app/atoms/selectedIndexState";
import { activeDivState } from "@/app/atoms/activeDivState";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function ChatScreen() {
  const selectedIndex = useRecoilValue(selectedIndexState);
  const activeDiv = useRecoilValue(activeDivState);

  const { data, error } = useQuery({
    queryKey: ["onChatScreen", activeDiv],
    queryFn: async () => {
      if (!activeDiv) {
        console.warn("activeDiv is null or undefined. Skipping query.");
        return null; // 반환값을 명시적으로 설정
      }
      const supabase = createClient();
      const { data, error } = await supabase.from("userinfo").select("*").eq("id", activeDiv);
      if (error) {
        console.error("Error checking user info:", error);
      }
      console.log(data);
      return data;
    },
    enabled: !!activeDiv, // activeDiv 가 있을 때만 쿼리 실행
  });
  return (
    <div className={"h-screen w-full flex flex-col"}>
      {data?.map((chat) => <div key={chat.id}>{chat.user_metadata.user_name}</div>)}
      {/*@ts-ignore*/}
      <Person
        index={selectedIndex}
        userId={"a"}
        name={"TG"}
        onlineAt={new Date().toISOString()}
        isActive={false}
        onChatScreen={true}
        // onClick={null}
      />

      <div className={"grow flex flex-col p-4 gap-5"}>
        <Message isFromMe={true} message={"Hello world"} />
        <Message isFromMe={false} message={"Hi~"} />
        <Message isFromMe={true} message={"Hello world"} />
        <Message isFromMe={false} message={"Hi~"} />
      </div>

      <div className={"flex gap-3"}>
        <input type="text" className={"border-2 p-2 grow"} placeholder={"메세지를 입력하세요."} />
        {/*@ts-ignore*/}
        <Button color={"blue-gray"} className={"min-w-[180px]"}>
          전송하기
        </Button>
      </div>
    </div>
  );
}
