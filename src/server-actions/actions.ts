"use server";

import { createClient } from "@/utils/supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export const getTodo = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("Todo").select("*");
  handleError(error);
  return data;
};
