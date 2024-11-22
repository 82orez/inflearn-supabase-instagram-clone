"use client";

import { getRandomImage } from "@/utils/random";
import TimeAgo from "javascript-time-ago";
import ko from "javascript-time-ago/locale/ko";

interface Person {
  index: number | null;
  userId: string;
  name: string;
  onlineAt: string;
  isActive: boolean;
  onChatScreen: boolean;
  onClick: () => void;
}

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo("ko-KR");

export default function Person(person: Person) {
  return (
    <div
      // ! ${person.onClick && "cursor-pointer"} 이 부분 재검토 필요.
      // @ts-ignore
      className={`p-4 min-w-60 flex items-center gap-3 ${person.onClick && "cursor-pointer"} ${
        !person.onChatScreen && person.isActive && "bg-light-blue-50"
      } ${!person.onChatScreen && !person.isActive && "bg-gray-300"} ${person.onChatScreen && "bg-gray-300"}`}
      onClick={person.onClick}>
      <img src={getRandomImage(person.index)} alt={person.name} className={"w-16 h-16 rounded-full"} />
      <div>
        <div className="text-black font-bold text-lg">{person.name}</div>
        <div className="text-gray-500 text-sm">{person.onlineAt && timeAgo.format(Date.parse(person.onlineAt))}</div>
      </div>
    </div>
  );
}
