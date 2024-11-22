"use client";

import Person from "@/components/chat/person";
import { useState } from "react";

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={"h-screen bg-gray-100"}>
      <Person
        index={0}
        userId={"a"}
        name={"TG"}
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 0}
        onChatScreen={false}
        onClick={() => setSelectedIndex(0)}
      />
      <Person
        index={1}
        userId={"a"}
        name={"TG"}
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 1}
        onChatScreen={false}
        onClick={() => setSelectedIndex(1)}
      />
    </div>
  );
}
