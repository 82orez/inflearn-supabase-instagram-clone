"use client";

import { Button } from "@material-tailwind/react";
import Message from "@/components/chat/message";
import { useRecoilValue } from "recoil";
import { activeDivState } from "@/app/atoms/activeDivState";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export default function ChatScreen() {
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

  if (error) {
    console.log(error.message);
    return <p>Error loading Lists</p>;
  }

  return activeDiv !== null ? (
    <div className={"h-screen w-full flex flex-col"}>
      {data?.map((chat) => (
        <div key={chat.id} className={"flex bg-amber-100 p-2"}>
          <img src={chat.user_metadata.avatar_url} alt="" className={"p-2 rounded-full w-20 h-20"} />
          <div className={"flex flex-col justify-center"}>
            <div>{chat.user_metadata.user_name}</div>
            <div>{timeAgo.format(Date.parse(new Date().toISOString()))}</div>
          </div>
        </div>
      ))}

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
  ) : (
    <div className={"w-full"}></div>
  );
}
