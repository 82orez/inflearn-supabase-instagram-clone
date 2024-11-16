"use client";

import { Button } from "@material-tailwind/react";
import { createClient } from "@/utils/supabase/client";

export default function Logout() {
  const supabase = createClient();
  return (
    <div>
      {/*@ts-ignore*/}
      <Button
        color={"red"}
        onClick={() => {
          supabase.auth.signOut();
          return;
        }}>
        Logout
      </Button>
    </div>
  );
}
