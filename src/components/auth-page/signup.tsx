"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

export default function Signup({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [otp, setOtp] = useState("");

  const validateEmail = (email) => {
    // 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const supabase = createClient();

  const signUpMutation = useMutation({
    mutationFn: async () => {
      if (!validateEmail(email)) {
        alert("유효한 이메일 주소를 입력해주세요.");
        return;
      }

      // 이메일 중복 확인
      const { data: existingUsers, error: userCheckError } = await supabase.from("userinfo").select("id").eq("email", email);

      if (userCheckError) {
        console.error("Error checking email:", userCheckError);
        alert("이메일 확인 중 오류가 발생했습니다.");
        return;
      }

      if (existingUsers && existingUsers.length > 0) {
        console.log(existingUsers);
        alert("이미 등록된 이메일 주소입니다. 로그인 페이지로 이동해주세요.");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      if (data.user) {
        setConfirmationRequired(true);
        console.log(data);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });
      if (error) {
        alert(error.message);
        return;
      }
      console.log(data);
    },
  });

  return (
    <div className={"flex flex-col justify-center items-center gap-10 h-screen bg-blue-gray-50 bg-gradient-to-br from-amber-100 to-light-blue-200"}>
      <div className="border-4 border-amber-600 w-full max-w-[480px] p-8 flex flex-col gap-3 bg-white">
        <Image src={"/inflearngram.png"} alt={""} width={520} height={121} />

        <p className={"mt-4 mb-2"}>회원 가입하기</p>
        {confirmationRequired ? (
          <input
            type="text"
            placeholder={"인증 번호"}
            className={"border-2 p-2 rounded-lg placeholder-gray-600"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        ) : (
          <>
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
          </>
        )}

        {/*@ts-ignore*/}
        <Button
          color={"cyan"}
          onClick={() => {
            if (confirmationRequired) verifyOtpMutation.mutate();
            else signUpMutation.mutate();
          }}
          loading={confirmationRequired ? verifyOtpMutation.isPending : signUpMutation.isPending}
          disabled={confirmationRequired ? verifyOtpMutation.isPending : signUpMutation.isPending}>
          {confirmationRequired ? "인증번호를 입력해주세요.." : "가입하기"}
        </Button>
      </div>

      <div className="border-4 border-amber-600 w-full max-w-[480px] p-8 flex flex-col bg-white">
        <div className={"mb-4"}>이미 계정이 있으신가요?</div>
        {/*@ts-ignore*/}
        <Button color={"deep-purple"} onClick={() => setView("signin")}>
          로그인 하기
        </Button>
      </div>
    </div>
  );
}
