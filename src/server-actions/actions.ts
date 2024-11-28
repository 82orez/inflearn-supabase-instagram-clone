"use server";

import { createClient } from "@/utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

// ? message: 내가 보낼 메세지
// ? chatUserId: 보낼 상대방 id
export const sendMessage = async ({ message, chatUserId }) => {
  const supabase = await createClient();

  const {
    data: { user }, // 반환되는 user 데이터는 객체 형태.
  } = await supabase.auth.getUser();
  // @ts-ignore
  const { data, error } = await supabase.from("Message").insert({
    message,
    receiver: chatUserId,
    sender: user?.id,
  });
  handleError(error);
  return data;
};

export const getAllMessages = async ({ chatUserId }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("Message")
    .select("*")
    .or(`receiver.eq.${chatUserId}, receiver.eq.${user?.id}`)
    .or(`sender.eq.${chatUserId}, sender.eq.${user?.id}`)
    .order("created_at", { ascending: true });

  handleError(error);

  return data;
};
