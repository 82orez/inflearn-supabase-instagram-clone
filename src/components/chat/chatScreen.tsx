"use client";

import { Button } from "@material-tailwind/react";
import Message from "@/components/chat/message";
import { useRecoilValue } from "recoil";
import { activeDivState } from "@/app/atoms/activeDivState";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
import { getAllMessages, sendMessage } from "@/server-actions/actions";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/react-query-provider";

TimeAgo.addLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export default function ChatScreen() {
  const activeDiv = useRecoilValue(activeDivState);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("messages_gram")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Message",
        },
        (payload) => {
          // console.log("payload: ", payload);
          if (payload.errors) {
            alert("채팅 중 오류 발생!");
          } else {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
          }
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // * Presence key
    const channel = supabase
      .channel("online_users", {
        config: {
          presence: {
            // * activeDiv 끝에 ! 을 추가해서 null 값을 가지지 않는다고 강제로 명시.
            // * 왜냐하면 activeDiv 값이 null 인 경우에는 useQuery 가 실행되지 않게 해놓음.
            key: activeDiv!,
          },
        },
      })
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log("newState: ", newState);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("join", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("leave", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        const presenceTrackStatus = await channel.track({ online_at: new Date().toISOString() });
        console.log(presenceTrackStatus);
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
      // console.log(data);
      return data;
    },
    enabled: !!activeDiv, // activeDiv 가 있을 때만 쿼리 실행
  });

  if (error) {
    console.log(error.message);
    return <p>Error loading Lists</p>;
  }

  const { data: allMessage, error: allMessageError } = useQuery({
    queryKey: ["messages", activeDiv],
    queryFn: () => {
      return getAllMessages({ chatUserId: activeDiv });
    },
    enabled: !!activeDiv, // activeDiv 가 있을 때만 쿼리 실행
  });

  if (allMessageError) {
    console.log(allMessageError.message);
    return <p>Error loading Message Lists</p>;
  }

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error) => console.error(error),
  });

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

      <div className={"grow flex flex-col p-4 gap-5 overflow-y-scroll"}>
        {allMessage?.map((message) => <Message key={message.id} message={message.message} isFromMe={message.receiver === activeDiv} />)}
      </div>

      <div className={"flex gap-3"}>
        <input
          type="text"
          className={"border-2 p-2 grow"}
          placeholder={"메세지를 입력하세요."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/*@ts-ignore*/}
        <Button
          color={"blue-gray"}
          className={"min-w-[180px]"}
          onClick={() => {
            if (message !== "") sendMessageMutation.mutate({ message: message, chatUserId: activeDiv });
          }}
          loading={sendMessageMutation.isPending}>
          전송하기
        </Button>
      </div>
    </div>
  ) : (
    <div className={"w-full"}></div>
  );
}
