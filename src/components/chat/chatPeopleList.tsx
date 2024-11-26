"use client";

import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
// import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { activeDivState } from "@/app/atoms/activeDivState";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";
import { useEffect } from "react";
import { presenceState } from "@/app/atoms/presenceState";

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export default function ChatPeopleList({ loggedInUserId }) {
  const [activeDiv, setActiveDiv] = useRecoilState(activeDivState);
  const [presence, setPresence] = useRecoilState(presenceState);

  const supabase = createClient();
  const handleClick = (index: string) => {
    setActiveDiv(index);
  };

  useEffect(() => {
    // * Presence key 값 설정.
    const channel = supabase
      .channel("online_users", {
        config: {
          presence: {
            key: loggedInUserId,
          },
        },
      })
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log("newState: ", newState);
        // * 순수 객체로 변환.
        const newStateObj = JSON.parse(JSON.stringify(newState));
        setPresence(newStateObj);
        console.log("newStateObj: ", newStateObj);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("join: ", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("leave: ", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        const presenceTrackStatus = await channel.track({
          // * 위에서 설정한 Presence key 에 대응하는 value 값에 해당.
          online_at: new Date().toISOString(),
        });
        console.log("presenceTrackStatus: ", presenceTrackStatus);
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
      const { data, error } = await supabase.from("userinfo").select("*").neq("id", loggedInUserId);
      if (error) {
        console.error("Error checking user info:", error);
      }
      return data;
    },
  });

  // @ts-ignore
  if (isPending) return <Spinner />;
  if (error) {
    console.log(error.message);
    return <p>Error loading Lists</p>;
  }

  return (
    <div className={"h-screen bg-gray-100 min-w-[200px]"}>
      {data?.map((people) => (
        <div
          key={people.id}
          onClick={() => handleClick(people.id)}
          className={`cursor-pointer p-2 flex ${activeDiv === people.id ? "bg-light-blue-100" : "bg-gray-300"}`}>
          <img src={people.user_metadata.avatar_url} alt="" className={"p-2 rounded-full w-20 h-20"} />
          <div className={"flex flex-col justify-center"}>
            <div>{people.user_metadata.user_name}</div>
            {/*@ts-ignore*/}
            <div>{presence?.[people.id]?.[0]?.online_at ? timeAgo.format(Date.parse(presence[people.id][0].online_at)) : ""}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
