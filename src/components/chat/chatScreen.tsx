"use client";

import Person from "@/components/chat/person";
import { Button } from "@material-tailwind/react";
import Message from "@/components/chat/message";

export default function ChatScreen() {
  return (
    <div className={"h-screen w-full flex flex-col"}>
      {/*@ts-ignore*/}
      <Person index={0} userId={"a"} name={"TG"} onlineAt={new Date().toISOString()} isActive={false} onChatScreen={true} onClick={null} />

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
