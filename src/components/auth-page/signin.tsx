"use client";

import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export default function Signin({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const signInMutation = useMutation({
    mutationFn: async () => {
      // 이 메일 가입 완료 여부 확인
      const { data: confirmedEmail, error: confirmedError } = await supabase
        .from("userinfo")
        .select("id")
        .eq("email", email)
        .not("email_confirmed_at", "is", null);

      if (confirmedError) {
        console.error("Error checking email:", confirmedError);
        alert("이메일 확인 중 오류가 발생했습니다.");
        return;
      }
      if (confirmedEmail?.length == 0) {
        alert("아직 가입되지 않은 이메일입니다.");
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data) {
        console.log("sign in success");
      }
    },
  });

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        // redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
        //   ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`
        //   : "http://localhost:3000/api/auth/callback",
        redirectTo: "https://instagram-clone.supaneer.com/api/auth/callback",
        // redirectTo: `http://example.com/auth/callback`,
      },
    });
    if (error) {
      console.error("Error Kakao Login:", error);
      return;
    }
    console.log("Kakao sign in success");
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  };

  return (
    <div className={"flex flex-col justify-center items-center gap-10 h-screen bg-blue-gray-50"}>
      <div className="border-4 border-amber-600 w-full max-w-[480px] p-8 flex flex-col gap-3 bg-white">
        <Image src={"/inflearngram.png"} alt={""} width={520} height={121} />

        <p className={"mt-4 mb-2"}>로그인 하기</p>

        <input
          type={"email"}
          value={email}
          placeholder={"email"}
          className={"border-2 p-2 rounded-lg placeholder-gray-600"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          value={password}
          placeholder={"password"}
          className={"border-2 p-2 rounded-lg placeholder-gray-600 mb-2"}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/*@ts-ignore*/}
        <Button
          color={"cyan"}
          onClick={() => {
            signInMutation.mutate();
          }}
          disabled={signInMutation.isPending}
          loading={signInMutation.isPending}>
          로그인 하기
        </Button>
        {/*@ts-ignore*/}
        <Button color={"amber"} onClick={() => signInWithKakao()}>
          카카오 로그인
        </Button>
      </div>

      <div className="border-4 border-amber-600 w-full max-w-[480px] p-8 flex flex-col bg-white">
        <div className={"mb-4"}>아직 계정이 없으신가요?</div>
        {/*@ts-ignore*/}
        <Button color={"deep-purple"} onClick={() => setView("signup")}>
          가입 하기
        </Button>
      </div>
    </div>
  );
}
