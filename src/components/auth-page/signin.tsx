import Image from "next/image";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function Signin({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Button color={"cyan"} onClick={() => {}}>
          가입하기
        </Button>
      </div>

      <div className="border-4 border-amber-600 w-full max-w-[480px] p-8 flex flex-col bg-white">
        <div className={"mb-4"}>이미 계정이 있으신가요?</div>
        {/*@ts-ignore*/}
        <Button color={"deep-purple"} onClick={() => setView("signup")}>
          로그인 하기
        </Button>
      </div>
    </div>
  );
}
